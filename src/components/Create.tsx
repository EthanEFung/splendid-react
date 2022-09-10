function Create() {
  /**
   * ...
   */
  const create: React.FormEventHandler<HTMLFormElement> = (event) => {
    fetch("http://localhost:8080/create")
      .then((response) => {
        console.log("ok::", response.ok);
      })
      .catch(console.error);
  };

  return (
    <div>
      <form onSubmit={create}>
        <button type="submit">Create A Room</button>
      </form>
    </div>
  );
}

export default Create;
