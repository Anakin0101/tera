import React from 'react';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'store/hooks/useAppSelector';
import { useGetTemplatesQuery, useSaveTemplateMutation } from 'services/apis';
import { openModal } from 'utils/modal';
import { BlockOrTrustTemplateModal } from 'components/modals/BlockOrTrustTemplateModal/ BlockOrTrustTemplateModal';
import { closeModal } from 'utils/modal';
import { Template } from './AllTemplatesScreen.types';

export const useAllTemplates = () => {
  const { userIp } = useAppSelector(state => state.deviceInfo);

  const [saveTemplate] = useSaveTemplateMutation();
  const { data: templatesResponse, isLoading: temlpatesLoading } = useGetTemplatesQuery({
    headers: { 'X-Bank-UserIp': userIp },
  });
  const [search, onChangeText] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const { deviceToken: savedDeviceToken } = useAppSelector(state => state.deviceInfo);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const BlockOrTrustFunction = async (shouldBlock: boolean, data: Template) => {
    if (shouldBlock) {
    } else {
      const res = await saveTemplate({
        headers: {
          'X-Bank-userip': userIp,
          'X-Bank-Sendotp': 'true',
          'X-Bank-Isstrongauthrequest': 'true',
          'X-Bank-DeviceToken': savedDeviceToken,
        },
        body: data,
      });
      if ('data' in res && res.data?.otpRequired) {
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
  const templateAddBtn = (data: Template) => {
    openModal({
      element: (
        <BlockOrTrustTemplateModal
          shouldBlock={false}
          onClose={closeModal}
          onPress={() => BlockOrTrustFunction(false, data)}
        />
      ),
      title: 'dashboard.trustedTemplate',
      titlePosition: 'left',
      disablePanning: true,
    });
  };

  const filteredTemplates = templatesResponse?.templates.filter(template =>
    template.name.toLowerCase().includes(debouncedValue.toLowerCase()),
  );

  return {
    templates: filteredTemplates || [],
    onChangeText,
    debouncedValue,
    temlpatesLoading,
    search,
    filteredTemplates,
    templateDeleteBtn,
    templateAddBtn,
  };
};
