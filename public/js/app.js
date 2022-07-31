console.log("client side")
const weatherForm = document.querySelector("form");
const searchInput = document.querySelector("input")
const messageOne = document.getElementById("message-1")
const messageTwo = document.getElementById("message-2")

weatherForm.addEventListener("submit", (e) => {
      e.preventDefault()
      messageOne.textContent = "...loading"
      messageTwo.textContent=""
      const search = searchInput.value
      fetch(`http://localhost:4000/weather?address=${search}`).then(res => {
            res.json().then((data) => {
                  if (data?.error) {
                        messageOne.textContent = data.error
                  }
                  else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                  }
            })
      })
})