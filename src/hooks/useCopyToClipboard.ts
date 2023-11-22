import Clipboard from '@react-native-clipboard/clipboard';
import { openToast } from 'utils/toast';

export const useCopyToClipboard = () => {
  const copyToClipboard = (text: string, message: string) => {
    if (!text) {
      return null;
    }
    Clipboard.setString(text);
    fetchCopiedText(message);
  };

  const fetchCopiedText = async (message: string) => {
    const copied = await Clipboard.getString();
    if (copied) {
      openToast(message, 'success');
    }
  };

  return {
    copyToClipboard,
  };
};
