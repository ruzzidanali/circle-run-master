function normalizeAccountNumber(region, accRaw) {
  if (!accRaw) return "";
  let acc = accRaw.replace(/\s+/g, "").trim();

  switch (region.toLowerCase()) {
    case "negeri-sembilan":
    case "negeri sembilan":
      acc = acc.replace(/-/g, "");
      acc = acc.replace(/^0+/, "");
      return acc;

    case "selangor":
      acc = acc.replace(/^0+/, "");
      return acc;

    case "johor":
      acc = acc.replace(/[.\-]/g, "");
      acc = acc.replace(/[^A-Za-z0-9]/g, "");
      return acc;

    default:
      return acc;
  }
}

//Only for Melaka
function formatInvoice(raw) {
  if (!raw) return "";
  let v = raw.trim();
  v = v.replace(/[^\w()]/g, "");
  return v;
}

// regionParsers.js
export function parseJohorFields(results) {
  const out = {};

  /* ---------------------- 🧾 Deposit ---------------------- */
  const depositRaw = results["Deposit"];
  if (depositRaw) {
    const match = depositRaw.match(/(\d+(?:[.,]\d{1,2})?)/);
    out["Deposit"] = match ? match[1].replace(",", ".") : "0.00";
  } else {
    out["Deposit"] = "0.00";
  }

  /* ---------------------- 🧾 Tunggakan + Tarikh ---------------------- */
  const tunggakanRaw = results["Tunggakan dan Tarikh Section"] || "";
  if (tunggakanRaw) {
    const tunggakanMatch = tunggakanRaw.match(
      /TUNGGAKAN(?:\s+\d{2}\/\d{2}\/\d{2,4})?(?:\s+[A-Z0-9\/]+)?\s+([0-9]+(?:[.,][0-9]{1,2})?)/i
    );
    out["Tunggakan"] = tunggakanMatch
      ? tunggakanMatch[1].replace(",", ".")
      : "0.00";

    const dateMatch = tunggakanRaw.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/g);
    if (dateMatch && dateMatch.length >= 1) {
      out["Tarikh"] = dateMatch[0];
      if (dateMatch.length >= 2) out["Tarikh Tamat"] = dateMatch[1];
    }
  } else {
    out["Tunggakan"] = "0.00";
  }

  /* ---------------------- 🧾 Jumlah Bil Semasa ---------------------- */
  const jumlahBilRaw = results["Jumlah Bil Semasa Section"];
  if (jumlahBilRaw) {
    const match = jumlahBilRaw.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)/);
    if (match) {
      const num = match[1].replace(/,/g, "");
      out["Jumlah Bil Semasa"] = num;
    }
  }

  /* ---------------------- 🧽 Cleaners ---------------------- */
  function cleanNoBil(rawText) {
    if (!rawText) return "";
    let normalized = rawText.replace(/\s+/g, "").trim();
    normalized = normalized.replace(/[^A-Z0-9]/gi, "");
    normalized = normalized.replace(/([A-Z]?\d{5,6}).*/, "$1");

    // ✅ Proper like N25082 or L25071
    const match = normalized.match(/\b([A-Z]{1,2}\d{5,6})\b/);
    if (match) normalized = match[1];

    // ✅ Wrong extra “1” (L125071 → L25071)
    if (/^[LN]1\d{5,6}$/i.test(normalized)) {
      normalized = normalized[0] + normalized.slice(2);
    }

    // ✅ Only digits (OCR lost prefix)
    if (/^\d{5,6}$/.test(normalized)) {
      if (normalized.startsWith("1")) normalized = normalized.slice(1);
      normalized = "L" + normalized;
    }

    // ✅ Fix OCR ‘O’ to ‘0’
    normalized = normalized.replace(/O/g, "0");

    return normalized;
  }

  function cleanMeter(rawText) {
    if (!rawText) return "";

    let text = rawText.toUpperCase();

    // Fix common OCR misreads
    text = text
      .replace(/SAI/g, "SAJ")
      .replace(/SAL/g, "SAJ")
      .replace(/SAl/g, "SAJ")
      .replace(/I/g, "1")
      .replace(/L(?=\d)/g, "1")
      .replace(/HO/g, "H0")
      .replace(/A0/g, "H0")
      .replace(/0O/g, "00")
      .replace(/O0/g, "00");

    // Remove unnecessary symbols but keep spaces for pattern context
    text = text.replace(/[^\w\s]/g, " ");

    // Handle weird “SAJ1A” or “SAJ1S” duplication
    text = text.replace(/SAJ1S([A-Z])/, "SAJ1$1");
    if (/^SAJ1A\d+/.test(text)) text = text.replace(/^SAJ1A/, "SAJ15A");
    if (/^SAJ1[A-Z]/.test(text) && !text.includes("15"))
      text = text.replace(/^SAJ1/, "SAJ15");

    // Find proper pattern like SAJ23H087385 or SAJ22A131046
    const match = text.match(
      /SAJ\d{2}[AH]\d{4,7}(?!\d{2}(\s*\/|\s*-)?\d{2}(\s*\/|\s*-)?\d{2,4})/
    );

    let result = "";
    if (match) result = match[0];
    else {
      const alt = text.match(/SAJ[A-Z0-9]{6,12}/);
      if (alt) result = alt[0].replace(/(\d{5,7})(\d{2,}|$).*/, "$1");
      else result = text;
    }

    // ✅ Remove any remaining spaces, tabs, or stray characters
    return result.replace(/\s+/g, "").trim();
  }

  /* ---------------------- 🧾 Normalize No. Bil & Akaun ---------------------- */
  function formatNoBil(raw) {
    if (!raw) return "";
    let cleaned = raw.replace(/[^\w]/g, "").toUpperCase();
    const prefixMatch = cleaned.match(/^[A-Za-z]\d{5,}/);
    const prefix = prefixMatch ? prefixMatch[0] : "";

    const noMatch = cleaned.match(/NO\s*(\d+)/i);
    const noNum = noMatch ? noMatch[1] : "";

    if (prefix && noNum) return `${prefix}(NO ${noNum})`;

    return raw.trim();
  }
  out["No. Bil"] = formatNoBil(results["No. Bil"]);

  let accRaw = (results["No. Akaun"] || "").trim();
  let acc = accRaw.replace(/[^\w\-]/g, "");
  acc = acc
    .replace(/^(\d{8})[-1Iil\.]+L?(\d{5,})$/i, "$1-L$2")
    .replace(/^(\d{8})([A-Z])(\d{5,})$/i, "$1-$2$3");
  out["No. Akaun"] = acc.replace(/-/g, "");

  /* ---------------------- 🧾 Meter / Tarikh / Penggunaan ---------------------- */
  const meterRaw = results["No Meter, Tarikh, Penggunaan(m3) Section"] || "";
  if (meterRaw) {
    const meterMatch = meterRaw.match(/(SA[J|I][0-9A-Z]+)/i);
    out["No. Meter"] = meterMatch ? meterMatch[1].trim() : "";
    if (out["No. Meter"]) {
      out["No. Meter"] = out["No. Meter"]
        .toUpperCase()
        .replace(/^SAI/, "SAJ")
        .replace(/[^A-Z0-9]/g, "");
    }

    const meterLine =
      meterRaw.split("\n").find((l) => /SA[J|I]/i.test(l)) ||
      meterRaw.split("\n")[0];
    const usageMatch =
      typeof meterLine === "string"
        ? meterLine.match(/(\d{1,5}(?:[.,\s]\d{1,2})?)\s*(?:m3|$)/i)
        : null;
    if (usageMatch) {
      let val = usageMatch[1].replace(/\s+/g, "").replace(",", ".");
      if (!val.includes(".")) val += ".00";
      out["Penggunaan (m3)"] = val;
    } else {
      const fallbackUsage = meterRaw.match(
        /(\d{2,4}(?:[.,]\d{1,2})?)\s*(?:m3|$)/i
      );
      out["Penggunaan (m3)"] = fallbackUsage
        ? fallbackUsage[1].replace(",", ".")
        : "0.00";
    }

    const dateMatches = meterRaw.match(/(\d{2}[\/\-]\d{2}[\/\-]\d{4})/g);
    if (dateMatches && dateMatches.length >= 2) {
      const start = dateMatches[1];
      const end = dateMatches[0];
      out["Tempoh Bil"] = `${start} - ${end}`;
      const d1 = new Date(start.split("/").reverse().join("-"));
      const d2 = new Date(end.split("/").reverse().join("-"));
      out["Bilangan Hari"] = Math.abs(
        Math.round((d2 - d1) / 86400000)
      ).toString();
    }
  }

  /* ---------------------- 🧾 Jumlah Caj Air Semasa ---------------------- */
  const cajRaw = results["Jumlah Caj Air Semasa Section"];
  if (cajRaw) {
    const match = cajRaw.match(/(\d{1,3}(?:,\d{3})*(?:\.\d{1,2})?)/);
    if (match) {
      const num = match[1].replace(/,/g, "");
      out["Jumlah Caj Air Semasa"] = num;
    }
  }

  if (!out["Jumlah Caj Air Semasa"])
    out["Jumlah Caj Air Semasa"] = out["Jumlah Bil Semasa"] || "0.00";

  return out;
}

export function parseKedahFields(results, fileName) {
  const section =
    results[
      "Jumlah Caj Semasa, Jumlah Tunggakan dan Jumlah Perlu Dibayar Section"
    ] || "";

  // 🧾 Helper: extract numeric values (robust against missing RM / newlines)
  const getValue = (label) => {
    const regex = new RegExp(label + "[^0-9]*([0-9]+(?:[.,][0-9]{1,2})?)", "i");
    const match = section.match(regex);
    return match ? match[1].replace(",", ".") : "0.00";
  };

  // 🧾 Build clean structured output
  return {
    "File Name": fileName,
    Region: "Kedah",
    "Nombor Akaun": results["No. Akaun"] || "",
    "No. Invois": results["No. Bil"] || "",
    Tarikh: results["Tarikh"] || "",
    "Tempoh Bil": results["Tempoh Bil"] || "",
    "Nombor Meter": results["No. Meter"] || "",
    "Penggunaan Semasa": results["Penggunaan Semasa"] || "",
    "Jumlah Caj Semasa": getValue("JUMLAH CAJ SEMASA"),
    "Jumlah Tunggakan": getValue("JUMLAH TUNGGAKAN"),
    "Jumlah Perlu Dibayar": getValue("JUMLAH PERLU DIBAYAR"),
    Cagaran: results["Cagaran"] || "0.00",
  };
}

export function parseNegeriSembilanFields(results) {
  const out = {};

  // 🧾 Basic fields
  // out["No. Akaun"] = results["No. Akaun"] || "";
  // out["No. Invois"] = results["No. Bil"] || "";
  out["No. Akaun"] = normalizeAccountNumber(
    "Negeri Sembilan",
    results["No. Akaun"] || ""
  );
  out["No. Invois"] = results["No. Bil"] || "";

  // 🗓️ Normalize Tarikh (e.g. 09-08-2025 → 09/08/2025)
  if (results["Tarikh"]) {
    const norm = results["Tarikh"]
      .replace(/[.\-]/g, "/")
      .replace(/\s+/g, "")
      .trim();
    out["Tarikh"] = norm;
  } else {
    out["Tarikh"] = "";
  }

  // 🧮 Extract tempoh bil + bilangan hari
  const section = results["Bilangan Hari Section"] || "";
  const match = section.match(
    /TEMPOH\s+BIL\s+SEMASA\s*[:\-]?\s*(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4}).*?(?:HINGGA|TO)\s*(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})/i
  );

  if (match) {
    const start = `${match[1].padStart(2, "0")}/${match[2].padStart(2, "0")}/${match[3]}`;
    const end = `${match[4].padStart(2, "0")}/${match[5].padStart(2, "0")}/${match[6]}`;
    out["Tempoh Bil"] = `${start} - ${end}`;

    const d1 = new Date(`${match[3]}-${match[2]}-${match[1]}`);
    const d2 = new Date(`${match[6]}-${match[5]}-${match[4]}`);
    const days = Math.abs(Math.round((d2 - d1) / 86400000));
    out["Bilangan Hari"] = days.toString();
  } else {
    out["Tempoh Bil"] = "";
    out["Bilangan Hari"] = "";
  }

  // 🔢 Clean Penggunaan
  if (results["Penggunaan"]) {
    const match = results["Penggunaan"].match(/(\d+(?:[.,]\d+)?)/);
    out["Penggunaan"] = match ? match[1].replace(",", ".") : "0";
  } else {
    out["Penggunaan"] = "0";
  }

  // 💰 Clean Deposit (remove RM)
  if (results["Deposit"]) {
    const match = results["Deposit"].match(/([0-9]+(?:[.,][0-9]{1,2})?)/);
    out["Deposit"] = match ? match[1].replace(",", ".") : "0.00";
  } else {
    out["Deposit"] = "0.00";
  }

  // 💧 Remaining fields
  out["No. Meter"] = results["No. Meter"] || "";
  out["Caj Semasa"] = results["Caj Semasa"] || "0.00";
  out["Tunggakan"] = results["Tunggakan"] || "0.00";
  out["Jumlah Perlu Dibayar"] = results["Jumlah Perlu Dibayar"] || "0.00";

  return out;
}

export function standardizeOutput(data) {
  // 🧹 Helper: Clean numeric string, default 0.00
  // const cleanNum = (v) => {
  //   if (!v || v === "" || v === null) return "0.00";
  //   const cleaned = v.toString().replace(/[^\d.,-]/g, "").replace(",", ".");
  //   return cleaned === "" ? "0.00" : cleaned;
  // };

  const cleanNum = (v) => {
    if (!v || v === "" || v === null) return "0.00";
    let cleaned = v.toString().trim();

    cleaned = cleaned
      .replace(/[^\d.,]/g, "")
      .replace(/(\d)[,.](?=\d{3}\b)/g, "$1")
      .replace(",", ".");

    const parts = cleaned.split(".");
    if (parts.length > 2) {
      const last = parts.pop();
      cleaned = parts.join("") + "." + last;
    }

    return cleaned === "" ? "0.00" : cleaned;
  };

  // 🧹 Helper: Clean text string, default null
  const cleanText = (v) => {
    if (!v || v === "" || v === null) return null;
    return v
      .toString()
      .trim()
      .replace(/[^\w\s\/\-\.,]/g, "");
  };

  return {
    File_Name: cleanText(data["File Name"] || data["File_Name"]),
    Region: cleanText(data["Region"]),
    No_Invois:
      data["Region"] && data["Region"].toLowerCase() === "johor"
        ? (data["No. Bil"] || data["No. Invois"] || "").trim()
        : data["Region"] && data["Region"].toLowerCase() === "melaka"
          ? formatInvoice(data["No. Invois"] || data["No. Bil"] || "")
          : cleanText(
              data["No. Invois"] ||
                data["No. Bil"] ||
                data["No_Invois"] ||
                data["No_Bil"]
            ),
    No_Akaun: cleanText(
      normalizeAccountNumber(
        data["Region"] || "",
        data["No. Akaun"] || data["Nombor Akaun"] || data["Nombor_Akaun"]
      )
    ),
    // No_Akaun: cleanText(
    //   data["No. Akaun"] ||
    //     data["Nombor Akaun"] ||
    //     data["Nombor_Akaun"]
    // ),
    Tarikh: cleanText(
      (data["Tarikh"] || "").toString().replace(/-/g, "/").trim()
    ),
    Tempoh_Bil: cleanText(data["Tempoh Bil"] || data["Tempoh_Bil"]),
    Bilangan_Hari: cleanText(data["Bilangan Hari"] || data["Bilangan_Hari"]),
    No_Meter: cleanText(
      data["No. Meter"] || data["Nombor Meter"] || data["Nombor_Meter"]
    ),
    Penggunaan: cleanNum(
      data["Penggunaan"] || data["Penggunaan (m3)"] || data["Penggunaan Semasa"]
    ),
    Caj_Semasa: cleanNum(
      data["Caj Semasa"] ||
        data["Jumlah Bil Semasa"] ||
        data["Jumlah Caj Semasa"] ||
        data["Jumlah Caj Air Semasa"] ||
        data["Bil Semasa"] ||
        data["Jumlah Perlu Dibayar"] ||
        data["Jumlah_Perlu_Dibayar"]
    ),
    Tunggakan: cleanNum(data["Tunggakan"] || data["Jumlah Tunggakan"]),
    Jumlah_Perlu_Dibayar: cleanNum(
      data["Caj Semasa"] ||
        data["Jumlah Bil Semasa"] ||
        data["Jumlah Caj Semasa"] ||
        data["Jumlah Caj Air Semasa"] ||
        data["Bil Semasa"] ||
        data["Jumlah Perlu Dibayar"] ||
        data["Jumlah_Perlu_Dibayar"]
    ),
    Deposit: cleanNum(data["Deposit"] || data["Cagaran"]),
  };
}
