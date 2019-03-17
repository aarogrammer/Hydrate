class Hydrate {

    private count: number;
    private vscode: any;
    private alertTime: number;
    private userInput: number;
    private userTime: number;
    private workingTime: number;
    private timeRemaining: number;
    private timeLeftStatusBar: any;
    private goalMet: boolean;

    constructor(vscode: typeof import('vscode'), userInput: number) {
        this.count = 0;
        this.vscode = vscode;
        this.userInput = userInput;
        this.userTime = this.userInput * 1000;
        this.workingTime = 60 * 60 * this.userTime; // Not sure if I'll use this yet
        this.timeRemaining = this.userInput;
        this.alertTime = 7200000;
        this.timeLeftStatusBar = false;
        this.goalMet = false;
    }

    private timeLeft(initialTime: boolean) {
        if (this.timeRemaining === 0) {
            return false;
        }
        if (!initialTime) {
            this.timeRemaining = this.timeRemaining - 1;
            return this.timeRemaining;
        }
    }

    private timeLeftMessage(options: { initialTime: boolean; }) {
        this.timeLeft(options.initialTime);
        if (!this.timeLeftStatusBar) {
            this.timeLeftStatusBar = this.vscode.window.createStatusBarItem(this.vscode.StatusBarAlignment.right, 1);
        }
        // Wait 60 seconds after no remaining time and hide status bar.
        if (this.timeRemaining <= 0) {
            setInterval(() => {
                this.timeLeftStatusBar.hide();
            }, 60000);
        }
        this.timeLeftStatusBar.text = this.timeRemaining > 0
            ? `$(clock) ${this.timeRemaining} hours time remaining.`
            : `$(clock) No time remaining.`;
        this.timeLeftStatusBar.color = 'White';
        this.timeLeftStatusBar.show();
    }

    public init() {
        let statusBarItem = this.vscode.window.createStatusBarItem(this.vscode.StatusBarAlignment.Left, 2);
        this.vscode.window.showInformationMessage(`
        We will keep track of how much water you should have consumed in the bottom left status bar.
        Working for ${this.userInput} hours, you should consume ${this.userInput / 2} cups of water*
        `);
		statusBarItem.show();

		const counterInterval = setInterval(() => {
			if (this.timeRemaining > 0) {
                const message = this.counter();
                statusBarItem.text = message;
                statusBarItem.color = 'White';
            } else {
                clearInterval(counterInterval);
            }
        }, this.alertTime);
        
        const goalCheckInterval = setInterval(() => {
            const goal:any = this.goalCheck();
            if (this.timeRemaining > 0) {
                this.vscode.window.showInformationMessage(goal);
                if(this.goalMet) {
                    clearInterval(goalCheckInterval);
                }
            }
        }, this.alertTime);
        this.timeLeftMessage({initialTime: true});

        const timeRemainingInterval = setInterval(() => {
            if (this.timeRemaining > 0) {
                this.timeLeftMessage({initialTime: false});
            } else {
                clearInterval(timeRemainingInterval);
            }
        }, 3600000);
    }
    
    private counter() {
        this.count++;
        if (this.count <=1) {
            return `$(heart) You should have consumed ${this.count} glass of water`;
        } 
        if(this.count >= this.userInput / 2) {
            return `$(check) You should have consumed ${this.userInput / 2} cups of water this session of ${this.userInput} hours work. Good work!`;
        }
        return `$(heart) You should have consumed ${this.count} glasses of water`;
    }

    private goalCheck() {
        if (this.count >= this.userInput / 2) {
            this.goalMet = true;
            return `You should have consumed ${this.userInput / 2} cups of water this session of ${this.userInput} hours work. Good work!`;
        }
        return 'Make sure to grab a glass of water!';
    }

}

export { Hydrate };