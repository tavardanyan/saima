import { useState, FormEvent } from 'react';

function LinkCreation() {

  const [name, setName] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`The name you entered was: ${name}`)
  }

  return (
    <div className="LinkCreation">
      <h1>LinkCreation</h1>
      <p>{name}</p>
      <form onSubmit={handleSubmit} noValidate>
        <label>Enter your Video URL:
          <input 
            type="text" 
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <input type="submit" />
    </form>
    </div>
  );
}

export default LinkCreation;
