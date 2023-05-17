import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_URL, DEFAULT_FILE_NAME } from '../constants';

type ErrorObject = {
  where: string;
  message: string;
}
interface VideoData {
  status: number;
  message: string;
  data: { url: string } | null;
  errors: ErrorObject[] | null;
}

function VideoDownloading() {
  const CHUNK_SIZE = 1024 * 64; // 64KB chunk size
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>();
  const { key } = useParams<{ key: string }>();

  const setErrorResponseAsMessage = (errors: ErrorObject[]) =>{
    setErrorMessage(errors.map((err: ErrorObject) => `(${err.where}) - ${err.message}`).join('\n'));
  }

  const handleDownload = async () => {
    if (!videoUrl) return;

    setIsDownloading(true);
    let downloadedBytes = 0;
    // let totalBytes = 0;
    let chunks: Blob[] = [];

    const response = await axios.head(videoUrl);
    const fileSize = parseInt(response.headers['content-length'] || '0', 10);

    while (downloadedBytes < fileSize) {
      const startByte = downloadedBytes;
      const endByte = Math.min(startByte + CHUNK_SIZE - 1, fileSize - 1);

      const chunkResponse = await axios({
        url: videoUrl,
        method: 'GET',
        responseType: 'blob',
        headers: { Range: `bytes=${startByte}-${endByte}` },
      });

      const chunkBlob = chunkResponse.data;
      chunks.push(chunkBlob);
      // totalBytes += chunkBlob.size;
      downloadedBytes += chunkBlob.size;

      setProgress(downloadedBytes / fileSize);
    }

    const fullBlob = new Blob(chunks);
    const url = window.URL.createObjectURL(fullBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = DEFAULT_FILE_NAME + '.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloading(false);
  };

  useEffect(() => {
    handleDownload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoUrl]);

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get<VideoData>(API_URL + key);
        if (response.data.data) {
          setVideoUrl(response.data.data.url);
          setErrorMessage(null);
        } else {
          response.data.errors && setErrorResponseAsMessage(response.data.errors);
        }
      } catch (error: any) {
        setVideoUrl(null);
        setErrorResponseAsMessage(error.response?.data.errors || [{
          where: 'server',
          message: 'Something went wrong'
        }]);
      }
    }
    key && fetchVideoData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!videoUrl) return null;

  return (
    <div>
      {isDownloading ? (
        <progress value={progress} />
      ) : (
        <button onClick={handleDownload}>Download Video</button>
      )}
    </div>
  );
}

export default VideoDownloading;