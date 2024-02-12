import React, { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks/useAppSelector';
import {
  useGetTemplatesQuery,
  useSaveTemplateMutation,
  useDeleteTemplateMutation,
} from 'services/apis';
import { openModal } from 'utils/modal';
import { BlockOrTrustTemplateModal } from 'components/modals/BlockOrTrustTemplateModal/ BlockOrTrustTemplateModal';
import { closeModal } from 'utils/modal';
import { Template } from 'services/apis/dashboardAPI/dashboardAPI.types';
import { OTPModal } from 'components/modals';
import { openToast } from 'utils/toast';

export const useAllTemplates = () => {
  const { userIp } = useAppSelector(state => state.deviceInfo);
  const [search, setSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [isTrustedTemplate, setIsTrustedTemplate] = useState(false);
  const [saveTemplate, { isLoading: saveTemplateLoading }] = useSaveTemplateMutation();
  const [deleteTemplate, { isLoading: deleteTemplateLoading }] = useDeleteTemplateMutation();
  const {
    data: templatesResponse,
    isLoading: templatesLoading,
    refetch,
  } = useGetTemplatesQuery({
    headers: { 'X-Bank-UserIp': userIp },
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const updateTrustStatus = (template: Template, isTrusted: boolean): Template => {
    const updatedTemplate: Template = { ...template };
    const sections: Array<keyof Template> = ['bankExternal', 'bankInternal', 'budget'];
    sections.forEach(section => {
      const sectionData = updatedTemplate[section];

      if (sectionData && typeof sectionData === 'object' && 'isTrusted' in sectionData) {
        (sectionData as any).isTrusted = isTrusted;
        if (isTrusted) {
          (sectionData as any).trustedAddDate = new Date().toISOString();
        }
      }
    });

    return updatedTemplate;
  };

  const templateTrustFunction = async (isTrusted: boolean, data: Template, code?: string) => {
    let headers = {
      'X-Bank-userip': userIp,
      'X-Bank-Getauthmethod': 'true',
      'X-Bank-Sendotp': isTrusted ? 'true' : 'false',
      'X-Bank-Isstrongauthrequest': true,
      ...(code && { 'X-Bank-Otp': code }),
    };
    closeModal();
    return await saveTemplate({
      headers,
      body: updateTrustStatus(data, isTrusted),
    })
      .unwrap()
      .then(response => {
        refetch();
        setIsTrustedTemplate(true);
        return response;
      });
  };

  const BlockOrTrustFunction = async (shouldBlock: boolean, data: Template, isDelete = false) => {
    closeModal();
    if (shouldBlock) {
      await deleteTemplate({
        headers: { 'X-Bank-userip': userIp },
        body: { templateId: data.id },
      })
        .unwrap()
        .then(() => {
          refetch();
          openToast('Template successfully deleted', 'success');
        })
        .catch(err => console.error('Delete template failed:', err));
    } else {
      try {
        const response = await templateTrustFunction(!isDelete, data);
        if (response?.otpRequired) {
          openModal({
            element: <OTPModal onFinished={code => templateTrustFunction(!isDelete, data, code)} />,
          });
        } else {
          refetch();
          setIsTrustedTemplate(false);
          openToast(`Template successfully ${isDelete ? 'untrusted' : 'trusted'}`, 'success');
        }
      } catch (err) {
        console.error(`Failed to ${isDelete ? 'untrust' : 'trust'} template:`, err);
      }
    }
  };

  const templateDeleteBtn = (data: Template) => {
    openModal({
      element: (
        <BlockOrTrustTemplateModal
          shouldBlock={true}
          onClose={closeModal}
          onPress={() => BlockOrTrustFunction(true, data)}
        />
      ),
      title: 'dashboard.trustedTemplate',
      titlePosition: 'left',
      disablePanning: true,
    });
  };
  const templateAddBtn = (data: Template, isDelete: boolean) => {
    openModal({
      element: (
        <BlockOrTrustTemplateModal
          isDelete={isDelete}
          shouldBlock={false}
          onClose={closeModal}
          onPress={() => BlockOrTrustFunction(false, data, isDelete)}
        />
      ),
      title: 'dashboard.trustedTemplate',
      titlePosition: 'left',
      disablePanning: true,
    });
  };

  const filteredTemplates =
    templatesResponse?.templates.filter(template =>
      template.name.toLowerCase().includes(debouncedValue.toLowerCase()),
    ) || [];

  return {
    templates: filteredTemplates,
    setSearch,
    debouncedValue,
    templatesLoading,
    search,
    templateDeleteBtn,
    templateAddBtn,
    isTrustedTemplate,
    saveTemplateSuccessLoading: saveTemplateLoading,
    deleteTemplateSuccessLoading: deleteTemplateLoading,
  };
};
