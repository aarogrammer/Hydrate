class Hydrate {

    count: number;
    vscode: any;
    time: number;
    userInput: number;
    userTime: number;
    workingTime: number;

    constructor(vscode: typeof import("vscode"), userInput: number) {
        this.count = 0;
        this.vscode = vscode;
        this.userInput = userInput;
        this.userTime = this.userInput * 1000;
        this.workingTime = 60 * 60 * this.userTime;
        this.time = 1000;
    }

    init() {
        let statusBarItem = this.vscode.window.createStatusBarItem(this.vscode.StatusBarAlignment.Left);
		this.vscode.window.showInformationMessage(`We will keep track of how much water you should have consumed in the bottom left status bar.`);
		statusBarItem.show();

		setInterval(() => {
			const message = this.counter();
			statusBarItem.text = message;
			statusBarItem.color = "White";
        }, this.time);
        
        setInterval(() => {
            const goal:any = this.goalCheck();
            this.vscode.window.showInformationMessage(goal);
        }, this.time);
    }
    
    counter() {
        this.count++;
        // let statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        if (this.count <=1) {
            return `$(heart) You should have consumed ${this.count} glass of water`;
        } 
        if(this.count >= 8) {
            // return `Depending on your weight and height, check with a medical professional if you can consume more water. You should never over hydrate.`;
            return `$(check) You should have consumed the recommended amount of water for today. Congratulations!`;
        }
        return `$(heart) You should have consumed ${this.count} glasses of water`;
    }

    goalCheck() {
        if (this.count > 6 && this.count <= 8) {
            return `You should have consumed the recommended amount of water for today. Congratulations!`;
        }
        if (this.count < 6) {
            return 'Make sure to grab a glass of water!';
        }	
    }

}

export { Hydrate };