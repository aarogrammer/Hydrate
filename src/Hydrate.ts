class Hydrate {

    private count: number;
    private vscode: any;
    private alertTime: number;
    private userInput: number;
    private userTime: number;
    private workingTime: number;
    private timeRemaining: number;
    private timeLeftStatusBar: any;

    constructor(vscode: typeof import('vscode'), userInput: number) {
        this.count = 0;
        this.vscode = vscode;
        this.userInput = userInput;
        this.userTime = this.userInput * 1000;
        this.workingTime = 60 * 60 * this.userTime; // Not sure if I'll use this yet
        this.timeRemaining = this.userInput;
        this.alertTime = 1000;
        this.timeLeftStatusBar = false;
    }

    private timeLeft() {
        if (this.timeRemaining === 0) {
            return false;
        }
        this.timeRemaining = this.timeRemaining - 1;
        return this.timeRemaining;
    }

    private timeLeftMessage() {
        this.timeLeft();
        // let timeLeftToWork = this.userInput;
        if (!this.timeLeftStatusBar) {
            this.timeLeftStatusBar = this.vscode.window.createStatusBarItem(this.vscode.StatusBarAlignment.right);
        }
        // Wait 60 seconds after no remaining time and hide status bar.
        if (this.timeRemaining <= 0) {
            setInterval(() => {
                this.timeLeftStatusBar.hide();
            }, 60000);
        }
        this.timeLeftStatusBar.text = this.timeRemaining > 0
            ? `${this.timeRemaining} hours time remaining.`
            : `No time remaining.`;
        this.timeLeftStatusBar.color = 'White';
        this.timeLeftStatusBar.show();
    }

    public init() {
        let statusBarItem = this.vscode.window.createStatusBarItem(this.vscode.StatusBarAlignment.Left);
		this.vscode.window.showInformationMessage(`We will keep track of how much water you should have consumed in the bottom left status bar.`);
		statusBarItem.show();

		setInterval(() => {
			const message = this.counter();
			statusBarItem.text = message;
			statusBarItem.color = 'White';
        }, this.alertTime);
        
        setInterval(() => {
            const goal:any = this.goalCheck();
            this.vscode.window.showInformationMessage(goal);
            if (this.timeRemaining > 0) {
                this.timeLeftMessage();
            }
        }, this.alertTime);
    }
    
    private counter() {
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

    private goalCheck() {
        if (this.count > 6 && this.count <= 8) {
            return `You should have consumed the recommended amount of water for today. Congratulations!`;
        }
        if (this.count < 6) {
            return 'Make sure to grab a glass of water!';
        }	
    }

}

export { Hydrate };