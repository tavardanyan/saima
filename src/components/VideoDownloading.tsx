import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

interface VideoData {
  videoUrl: string;
  fileName: string;
}

function VideoDownloading() {
  const CHUNK_SIZE = 1024 * 64; // 64KB chunk size
  const [isDownloading, setIsDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [videoData, setVideoData] = useState<VideoData | null>({
    videoUrl: 'https://rr2---sn-0jvh-x8os.googlevideo.com/videoplayback?expire=1684128332&ei=7G1hZMbxHJatgAfPhJSYDw&ip=46.36.114.155&id=o-AMZRdfliG27n8ejKPXzwuPXYoxNPYt6AYWC05OuFHyw9&itag=18&source=youtube&requiressl=yes&mh=xq&mm=31%2C29&mn=sn-0jvh-x8os%2Csn-nv47ln7e&ms=au%2Crdu&mv=m&mvi=2&pl=20&initcwndbps=1050000&vprv=1&svpuc=1&mime=video%2Fmp4&ns=TX5itF_DpHFIX958pBiW7kEN&cnr=14&ratebypass=yes&dur=378.206&lmt=1665595224447446&mt=1684106214&fvip=4&fexp=24007246%2C51000011&c=WEB&txp=5538434&n=HDQA1IBbUfZkmj4LSy&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRgIhAOu0hdMAmcBxDRmQSqBkPv_qsu-c1iEkixDr93ae5mYKAiEAjh8gPTIYEdC2fpufICwDcyB7VsJtremHQPW_EBWnxog%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIgFIiVkpdgkDWWcalJHKNRjZcrJB99pcuB_GI5l-uBdBgCIQC0HAU_ackAdRF05KpTJFscAzzu3uaHem6NlBhwJbNM6Q%3D%3D',
    fileName: 'test'
  });
  const { key } = useParams<{ key: string }>();

  const handleDownload = async () => {
    if (!videoData) return;

    const { videoUrl, fileName } = videoData;
    setIsDownloading(true);
    let downloadedBytes = 0;
    let totalBytes = 0;
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
      totalBytes += chunkBlob.size;
      downloadedBytes += chunkBlob.size;

      setProgress(downloadedBytes / fileSize);
    }

    const fullBlob = new Blob(chunks);
    const url = window.URL.createObjectURL(fullBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName + '.mp4';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setIsDownloading(false);
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const response = await axios.get<{ data: VideoData }>(
          `/api/video?key=${key}`
        ); // pass the "key" parameter to the backend
        setVideoData(response.data.data);
        setErrorMessage(null);
      } catch (error: any) {
        setVideoData(null);
        setErrorMessage(error.response?.data?.message ?? 'An error occurred');
      }
    }
    fetchVideoData();
    handleDownload(); // automatically start the download when component is loaded
  }, [key]);

  if (errorMessage) return <div>{errorMessage}</div>;
  if (!videoData) return null;

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