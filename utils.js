function calculate() {
    const otr = parseFloat(document.getElementById('otr').value);
    const dpInput = parseFloat(document.getElementById('dp').value);
    const dpType = document.getElementById('dpType').value;
    const jangka = parseInt(document.getElementById('jangka').value);
    const resultEl = document.getElementById('result');

    if (isNaN(otr) || isNaN(dpInput) || isNaN(jangka)) {
        resultEl.textContent = 'Semua input harus diisi';
        return;
    }

    if (dpType === 'percent' && dpInput > 100) {
        resultEl.textContent = 'DP maximal adalah 100%';
        return;
    }

    let dp;
    if (dpType === 'percent') {
        dp = otr * (dpInput / 100);
    } else {
        dp = dpInput;
    }

    const pokokUtang = otr - dp;

    let bunga;
    if (jangka <= 12) {
        bunga = 0.12;
    } else if (jangka > 12 && jangka <= 24) {
        bunga = 0.14;
    } else {
        bunga = 0.165;}

    const totalBunga = pokokUtang * bunga;
    const totalUtang = pokokUtang + totalBunga;
    const angsuranPerBulan = totalUtang / jangka;

    resultEl.innerHTML = `
        Pokok Utang: Rp.${pokokUtang.toLocaleString()}<br/>
        Bunga: ${(bunga * 100).toFixed(1)}%<br/>
        Total Utang: Rp.${totalUtang.toLocaleString()}<br/>
        Angsuran per bulan: <strong>Rp.${angsuranPerBulan.toLocaleString(undefined, { minimumFractionDigits: 2 })}</strong>
    `;
}

function onDPTypeChange() {
    const dpInput = document.getElementById('dp');
    const dpType = document.getElementById('dpType').value;

    if (dpType === 'percent') {
        dpInput.setAttribute('max', '100');
        dpInput.setAttribute('min', '0');
        dpInput.setAttribute('placeholder', 'Masukkan persen');
    } else {
        dpInput.removeAttribute('max');
        dpInput.removeAttribute('min');
        dpInput.setAttribute('placeholder', 'Masukkan nominal');
    }

    dpInput.value = '';
}

function resetForm() {
    document.getElementById('otr').value = '';
    document.getElementById('dp').value = '';
    document.getElementById('dpType').value = 'fixed';
    document.getElementById('jangka').value = '';
    document.getElementById('result').innerHTML = '';

    onDPTypeChange();
}


window.onload = () => {
    onDPTypeChange();
};