const bcrypt = require('bcryptjs');

const plainPassword = 'your_actual_password'; // Use the exact password you're entering
const storedHash = '$2b$12$GqoghDJKgCjlptuKB0Lv.OjfuoGOlZ/OKPjVcPMN4FAqGTTxVHAkm'; // From MongoDB

bcrypt.compare(plainPassword, storedHash, (err, result) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Password Match:", result); 
  }
});