function useCreate(
  then: (res: Response) => any = (res) => res,
  error: (err: any) => any = (err) => err
) {
  return <Data>(data: Data) => {
    fetch("http://localhost:8080/create", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(then)
      .catch(error);
  };
}

export default useCreate;
