import { Platform, Share } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { PUBLIC_IMAGE_URL } from 'services/api';

export const downloadPdf = async (
  fileId: string,
  title: string,
  extension = 'pdf',
  notification = true,
  mime = 'application/pdf',
) => {
  const { fs, config } = ReactNativeBlobUtil;
  const {
    dirs: { DocumentDir, DownloadDir },
  } = fs;

  try {
    const res = await config({
      fileCache: true,
      appendExt: extension,
      path: `${DocumentDir}/${title}.${extension}`,
      addAndroidDownloads: {
        useDownloadManager: true,
        path: `${DownloadDir}/${title}.${extension}`,
        mime,
        title,
        notification,
        storeInDownloads: true,
      },
    }).fetch('GET', `${PUBLIC_IMAGE_URL}${fileId}`);

    if (Platform.OS === 'ios') {
      const filePath = res.path();
      let options = {
        type: mime,
        url: filePath,
        saveToFiles: true,
      };
      Share.share(options);
    }
  } catch (err) {
    console.warn('Download PDF error:', err);
  }
};
