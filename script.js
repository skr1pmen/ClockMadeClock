const clocks = document.querySelectorAll(".clocks");

setInterval(() => {
    const date = new Date()
    const hours = date.getHours()
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    clocks[0].className = `clocks c_${String(hours).padStart(2, '0')[0]}`
    clocks[1].className = `clocks c_${String(hours).padStart(2, '0')[1]}`
    clocks[2].className = `clocks c_${String(minutes).padStart(2, '0')[0]}`
    clocks[3].className = `clocks c_${String(minutes).padStart(2, '0')[1]}`
    clocks[4].className = `clocks c_${String(seconds).padStart(2, '0')[0]}`
    clocks[5].className = `clocks c_${String(seconds).padStart(2, '0')[1]}`
},1000)