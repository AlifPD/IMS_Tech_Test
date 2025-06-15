SELECT 
  k.kontrak_no,
  k.client_name,
  j.angsuran_ke,
  GREATEST(DATE_PART('day', DATE '2024-08-14' - j.tanggal_jatuh_tempo), 0) AS hari_keterlambatan,
  ROUND(
    GREATEST(DATE_PART('day', DATE '2024-08-14' - j.tanggal_jatuh_tempo), 0) 
    * 0.001 * j.angsuran_per_bulan
  ) AS total_denda
FROM 
  kontrak k
JOIN 
  jadwal_angsuran j ON k.kontrak_no = j.kontrak_no
WHERE 
  k.client_name = 'SUGUS'
  AND j.tanggal_jatuh_tempo > '2024-05-31'
  AND j.tanggal_jatuh_tempo <= '2024-08-14'
ORDER BY 
  j.angsuran_ke;