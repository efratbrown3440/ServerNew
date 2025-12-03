
const sleep = (milliseconds: number): Promise<void> => {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds);
    });
};


const TEST_DELAY_MS = 3000;

function testSleep() {
    const startTime = Date.now();
    console.log(`לפני${new Date().toLocaleTimeString()}`);

    sleep(TEST_DELAY_MS)
        .then(() => {
            console.log('finish');
            
            const endTime = Date.now();
            console.log(`אחרי ${new Date().toLocaleTimeString()}`);
            
            const elapsed = endTime - startTime;

            console.log(`\nהזמן שעבר ${elapsed} אלפיות שנייה.`);
            
            if (elapsed >= TEST_DELAY_MS ) {
                console.log("  ההמתנה הייתה כפי שהוגדר (3 שניות).");
            } else {
                console.log(" משך ההמתנה בפועל לא תאם את המצופה.");
            }
            console.log(`finish sleep  \n`);
        });

}


testSleep();