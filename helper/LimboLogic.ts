//generate a number between 1 and 100 #1
//check if its less than winchance #2
//if yes 
    //you have a winner
    //generate a number >= targetMultiplier #3
    //update user's balance with betAmount*argetMultiplier #4
    //return the generated number #5
//if no
    //you have loser
    //generate a number < targetMultiplier #6
    //update user's balance with betAmount*0 #7
    //return the generated number #8
//

const getRandomNumber = (modifier: number, baseNumber: number) => {
    return (Math.random() * modifier) + baseNumber;
}


export const getResult = (targetMultiplier: number, betAmount: number) => {
    const winChance = 99 / targetMultiplier;
    //#1
    const random = getRandomNumber(100, 1);
    console.log("randomMultiplier: ", random);
    
    //#2
    if (random <= winChance) {
        //#3
        const displayNumber = getRandomNumber(100, targetMultiplier);
        console.log("profit: ", targetMultiplier*betAmount);
        return displayNumber;
    } else {
        const displayNumber = getRandomNumber(targetMultiplier, 0);
        console.log("loss: ", betAmount);
        return (displayNumber < 1) ? 1 + displayNumber : displayNumber;
    }
}
