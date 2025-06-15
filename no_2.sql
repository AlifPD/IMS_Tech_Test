SELECT 
    k.kontrak_no,
    k.client_name,
    SUM(j.angsuran_per_bulan) AS total_angsuran_jatuh_tempo
FROM 
    kontrak k
JOIN 
    jadwal_angsuran j ON k.kontrak_no = j.kontrak_no
WHERE 
    k.client_name = 'SUGUS'
    AND j.tanggal_jatuh_tempo <= '2024-08-14'
GROUP BY 
    k.kontrak_no, k.client_name;