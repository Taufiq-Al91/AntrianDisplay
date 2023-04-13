function showDate() {
    // Membuat objek Date
    const today = new Date();

    // Array nama hari dalam bahasa Inggris
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];

    // Array nama bulan dalam bahasa Inggris
    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember",
    ];

    // Mendapatkan nama hari dan bulan berdasarkan tanggal
    const dayName = days[today.getDay()];
    const date = today.getDate();
    const monthName = months[today.getMonth()];
    const year = today.getFullYear();

    // Menampilkan tanggal dalam format "hari, tanggal bulan tahun"
    const formattedDate = `${dayName}, ${date} ${monthName} ${year}`; // mengambil waktu saat ini di zona waktu Jakarta WIB
    document.getElementById("date").innerHTML = formattedDate; // menampilkan jam pada elemen "clock"

    // menjalankan fungsi setiap detik
    setTimeout(showDate, 1000);
}




function showTime() {
    var date = new Date(); // mengambil waktu saat ini
    var hours = date.getUTCHours() + 7; // mengambil jam saat ini di zona WIB, ditambahkan 7 karena perbedaan waktu dengan UTC
    var minutes = date.getUTCMinutes(); // mengambil menit saat ini di zona WIB
    var seconds = date.getUTCSeconds(); // mengambil detik saat ini di zona WIB

    // jika jam lebih dari 24 (setelah ditambahkan 7), maka dikurangi 24 sehingga kembali ke 0-23
    hours = hours >= 24 ? hours - 24 : hours;

    // menambahkan angka 0 di depan jam, menit, dan detik jika angkanya kurang dari 10
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // menampilkan jam pada elemen "clock"
    document.getElementById("clock").innerHTML = hours + ":" + minutes + ":" + seconds;

    // menjalankan fungsi setiap detik
    setTimeout(showTime, 1000);
}

showTime();
showDate();
