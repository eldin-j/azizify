import './app.scss';
import Timer from './components/timer/Timer';
import TimerSettings from './components/timer-settings/TimerSettings';
import TaskList from './components/task-list/TaskList';
import { useState } from 'react';
import TimerSettingsContext from './components/timer-settings/TimerSettingsContext';

const App = () => {
    const [showSettings, setShowSettings] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(25);
    const [breakMinutes, setBreakMinutes] = useState(5);

    return (
        <main>
            <TimerSettingsContext.Provider
                value={{
                    showSettings,
                    setShowSettings,
                    workMinutes,
                    breakMinutes,
                    setWorkMinutes,
                    setBreakMinutes,
                }}
            >
                <div className="app-container">
                    <div className="timer-container">
                        {showSettings ? <TimerSettings /> : <Timer />}
                    </div>
                    <div className="tasklist-container">
                        <TaskList />
                    </div>
                </div>
            </TimerSettingsContext.Provider>
        </main>
    );
};

export default App;
