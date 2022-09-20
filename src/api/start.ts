function start(id: string) {
  console.log("start", id);
  fetch("http://localhost:8080/room/" + id + "/start", {
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      console.log("ok:", res.ok);
    })
    .catch(console.error);
}

export default start;
