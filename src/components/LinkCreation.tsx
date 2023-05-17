import axios from 'axios';
import { useState } from 'react';

type SuccessData = {
  id: string;
}

type ErrorResponse = {
  where: string;
  message: string;
}

type Response = {
  status: number;
  message: string;
  data: SuccessData | null;
  errors: ErrorResponse[] | null;
}

function LinkCreation() {

  const [url, setUrl] = useState<string>("");
  const [link, setLink] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const handleSubmit = async () => {
    const apiUrl: string = process.env.REACT_APP_API_URL as string;
    const response = await axios.post<Response>(apiUrl, { url });
    if (response.data.errors) {
      console.log(response.data)
      const msg = response.data.errors.map((err: ErrorResponse) => `${err.where}: ${err.message}`).join('\n');
      setMessage(msg);
    } else {
      setMessage(response.data.message);
      console.log(response.data)
      if (response.data.data) {
        setLink(window.location.href + response.data.data.id);
      }
    }
  }

  return (
    <div className="LinkCreation">
      <h1>LinkCreation</h1>
      <p>{message}</p>
      <label>Enter your Video URL:
        <input 
          type="text" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button onClick={handleSubmit}>Create Link</button>
      <p>{link}</p>
    </div>
  );
}

export default LinkCreation;
