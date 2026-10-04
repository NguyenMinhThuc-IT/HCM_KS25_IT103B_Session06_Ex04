let rawInventoryData = "";
let processedInventoryData = "";
let totalDeviceCount = 0;
let isDataLoaded = false;

const testInputQueue = [
  { choice: 2 },
  { choice: 1, inputData: "DUMBBELL:20#BARBELL:15#TREADMILL:05#MAT:40" },
  { choice: 2 },
  { choice: 3, oldPrefix: "DUMBBELL", newPrefix: "EQ-DB" },
  { choice: 4 },
  { choice: 1, inputData: "" },
  { choice: 2 },
  { choice: 0 }
];

let inputIndex = 0;

function getNextUserAction() {
  if (inputIndex < testInputQueue.length) {
    return testInputQueue[inputIndex++];
  }
  return { choice: 0 };
}

let isRunning = true;

do {
  const action = getNextUserAction();
  const choice = action.choice;

  switch (choice) {
    case 1: {
      console.log("\n================================================");
      console.log("[CHUC NANG 1] NHAP CHUOI DU LIEU KIEM KE KHO THO");
      console.log("================================================");

      const inputStr = action.inputData !== undefined ? action.inputData : "";
      const cleanedStr = inputStr.trim().toUpperCase();

      if (cleanedStr.length === 0) {
        console.log("LOI: Chuoi du lieu dau vao bi trong.");
        rawInventoryData = "";
        processedInventoryData = "";
        isDataLoaded = false;
        totalDeviceCount = 0;
      } else {
        rawInventoryData = cleanedStr;
        processedInventoryData = cleanedStr;
        isDataLoaded = true;
        totalDeviceCount = 0;
        console.log(`Ghi nhan chuoi kiem ke kho: "${rawInventoryData}"`);
      }
      break;
    }

    case 2: {
      console.log("\n================================================");
      console.log("[CHUC NANG 2] BOC TACH VA DEM TONG SO LUONG THIET BI");
      console.log("================================================");

      if (!isDataLoaded || processedInventoryData.length === 0) {
        console.log("LOI: Chua co du lieu kho hop le.");
        console.log("Vui long thuc hien Chuc nang 1 de nhap chuoi kiem ke truoc.");
        break;
      }

      totalDeviceCount = 0;
      let tempStr = processedInventoryData;

      while (tempStr.length > 0) {
        let segment = "";
        let hashIndex = tempStr.indexOf("#");

        if (hashIndex !== -1) {
          segment = tempStr.slice(0, hashIndex);
          tempStr = tempStr.slice(hashIndex + 1);
        } else {
          segment = tempStr;
          tempStr = "";
        }

        let colonIndex = segment.indexOf(":");
        if (colonIndex !== -1) {
          let qtyStr = segment.slice(colonIndex + 1).trim();
          let qty = Number(qtyStr) || 0;
          totalDeviceCount += qty;
        }
      }

      console.log(`Boc tach thanh cong du lieu kho!`);
      console.log(`Tong so luong thiet bi the hinh hien co: ${totalDeviceCount} don vi.`);
      break;
    }

    case 3: {
      console.log("\n================================================");
      console.log("[CHUC NANG 3] CHUAN HOA MA DINH DANH THIET BI");
      console.log("================================================");

      if (!isDataLoaded || processedInventoryData.length === 0) {
        console.log("LOI: Chua co du lieu kho hop le de chuan hoa.");
        break;
      }

      const oldPrefix = (action.oldPrefix || "").trim().toUpperCase();
      const newPrefix = (action.newPrefix || "").trim().toUpperCase();

      if (oldPrefix.length === 0 || newPrefix.length === 0) {
        console.log("LOI: Ma cu va ma moi khong duoc de rong.");
        break;
      }

      processedInventoryData = processedInventoryData.replaceAll(oldPrefix, newPrefix);
      console.log(`Thay the chuoi ma "${oldPrefix}" thanh "${newPrefix}" thành cong.`);
      console.log(`Chuoi du lieu sau khi chuan hoa: "${processedInventoryData}"`);
      break;
    }

    case 4: {
      console.log("\n================================================");
      console.log("[CHUC NANG 4] XUAT BAO CAO KIEM KE DANG BANG");
      console.log("================================================");

      if (!isDataLoaded || processedInventoryData.length === 0) {
        console.log("LOI: Khong co du lieu de xuat bao cao.");
        break;
      }

      const borderLine = "-".repeat(60);
      console.log(borderLine);
      console.log("             BAO CAO KIEM KE KHO THIET BI THE HINH          ");
      console.log(borderLine);
      console.log("TEN THIET BI".padEnd(20) + "SO LUONG".padStart(10) + "   GHI CHU CANH BAO");
      console.log(borderLine);

      let tempStr = processedInventoryData;
      let calculatedTotal = 0;

      while (tempStr.length > 0) {
        let segment = "";
        let hashIndex = tempStr.indexOf("#");

        if (hashIndex !== -1) {
          segment = tempStr.slice(0, hashIndex);
          tempStr = tempStr.slice(hashIndex + 1);
        } else {
          segment = tempStr;
          tempStr = "";
        }

        let colonIndex = segment.indexOf(":");
        if (colonIndex !== -1) {
          let deviceName = segment.slice(0, colonIndex).trim();
          let qtyStr = segment.slice(colonIndex + 1).trim();
          let qty = Number(qtyStr) || 0;

          calculatedTotal += qty;

          let warningFlag = "";
          if (qty < 10) {
            warningFlag = "[CAN BAO TRI/BO SUNG]";
          }

          let nameCol = deviceName.padEnd(20);
          let qtyCol = qty.toString().padStart(10);
          console.log(`${nameCol}${qtyCol}   ${warningFlag}`);
        }
      }

      totalDeviceCount = calculatedTotal;

      console.log(borderLine);
      console.log("TONG SO LUONG THIET BI".padEnd(20) + totalDeviceCount.toString().padStart(10));
      console.log(borderLine);
      break;
    }

    case 0: {
      console.log("\n================================================");
      console.log("[CHUC NANG 0] THOAT CHUONG TRINH");
      console.log("He thong quan tri kho the hinh da dong.");
      console.log("================================================");
      isRunning = false;
      break;
    }

    default: {
      console.log("\nLUA CHON KHONG HOP LE!");
      console.log("Vui long chon mot trong cac chuc nang: 1, 2, 3, 4 hoac 0.");
      break;
    }
  }
} while (isRunning);