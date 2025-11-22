// Data barang awal
    let barang = [
      { kode: "A01", nama: "Indomie Goreng", harga: 3500 },
      { kode: "A02", nama: "Aqua Botol", harga: 5000 },
      { kode: "A03", nama: "SilverQueen", harga: 15000 },
    ];
    
    let keranjang = [];

    // === Fungsi Daftar Barang ===
    function tampilkanBarang() {
      let tbody = document.querySelector("#tabelBarang tbody");
      tbody.innerHTML = "";
      barang.forEach(b => {
        tbody.innerHTML += `<tr>
          <td>${b.kode}</td>
          <td>${b.nama}</td>
          <td>Rp${b.harga.toLocaleString()}</td>
          <td><button class="btn btn-primary" onclick="isiForm('${b.kode}')">Pilih</button></td>
        </tr>`;
      });
    }

    function isiForm(kode) {
      let item = barang.find(b => b.kode === kode);
      if (item) {
        document.getElementById("kode").value = item.kode;
        document.getElementById("nama").value = item.nama;
        document.getElementById("harga").value = item.harga;
      }
    }

    // === CRUD Barang ===
    function tambahBarang() {
      let kode = kodeInput.value, nama = namaInput.value, harga = parseInt(hargaInput.value);
      if (kode && nama && harga > 0) {
        barang.push({ kode, nama, harga });
        tampilkanBarang();
        alert("Barang ditambahkan!");
      }
    }
    function editBarang() {
      let kode = kodeInput.value;
      let item = barang.find(b => b.kode === kode);
      if (item) {
        item.nama = namaInput.value;
        item.harga = parseInt(hargaInput.value);
        tampilkanBarang();
        alert("Barang diubah!");
      }
    }
    function hapusBarang() {
      let kode = kodeInput.value;
      barang = barang.filter(b => b.kode !== kode);
      tampilkanBarang();
      alert("Barang dihapus!");
    }

    // === Keranjang ===
    function beliBarang() {
      let kode = kodeBeli.value, jumlah = parseInt(jumlahBeli.value);
      let item = barang.find(b => b.kode === kode);
      if (item && jumlah > 0) {
        let existing = keranjang.find(k => k.kode === kode);
        if (existing) {
          existing.jumlah += jumlah;
        } else {
          keranjang.push({ ...item, jumlah });
        }
        tampilkanKeranjang();
      }
    }
    function tampilkanKeranjang() {
      let tbody = document.querySelector("#tabelKeranjang tbody");
      tbody.innerHTML = "";
      keranjang.forEach((item, i) => {
        tbody.innerHTML += `<tr>
          <td>${item.nama}</td>
          <td>Rp${item.harga.toLocaleString()}</td>
          <td>${item.jumlah}</td>
          <td>Rp${(item.harga * item.jumlah).toLocaleString()}</td>
          <td><button class="btn btn-danger" onclick="hapusKeranjang(${i})">Hapus</button></td>
        </tr>`;
      });
    }
    function hapusKeranjang(index) {
      keranjang.splice(index, 1);
      tampilkanKeranjang();
    }

    // === Hitung Total ===
    function hitungTotal() {
      let total = keranjang.reduce((sum, item) => sum + item.harga * item.jumlah, 0);
      let diskon = total > 100000 ? total * 0.1 : total > 50000 ? total * 0.05 : 0;
      let ppn = total * 0.11;
      return { total, diskon, ppn, bayar: total - diskon + ppn };
    }

    // === Struk Belanja ===
    function pilihPembayaran(metode) {
      switch (metode) {
        case "Cash": return "Metode: Cash";
        case "QRIS": return "Metode: QRIS";
        case "Debit": return "Metode: Debit";
        default: return "Metode pembayaran tidak valid";
      }
    }
    function strukBelanja() {
      let { total, diskon, ppn, bayar } = hitungTotal();
      let metode = document.getElementById("metode").value;
      let output = document.getElementById("output");
      if (keranjang.length === 0) {
        output.innerHTML = "<p>Keranjang masih kosong!</p>";
        return;
      }
      let struk = `<h3>=== STRUK BELANJA ===</h3>`;
      keranjang.forEach(item => {
        struk += `<p>${item.nama} x ${item.jumlah} = Rp${(item.harga * item.jumlah).toLocaleString()}</p>`;
      });
      struk += `<hr><p>Total: Rp${total.toLocaleString()}</p>`;
      struk += `<p>Diskon: Rp${diskon.toLocaleString()}</p>`;
      struk += `<p>PPN (11%): Rp${ppn.toLocaleString()}</p>`;
      struk += `<p class="highlight">Bayar: Rp${bayar.toLocaleString()}</p>`;
      struk += `<p>${pilihPembayaran(metode)}</p>`;
      output.innerHTML = struk;
    }

    // === Shorthand Input Elements ===
    const kodeInput = document.getElementById("kode");
    const namaInput = document.getElementById("nama");
    const hargaInput = document.getElementById("harga");
    const kodeBeli = document.getElementById("kodeBeli");
    const jumlahBeli = document.getElementById("jumlahBeli");

    // Inisialisasi
    tampilkanBarang();