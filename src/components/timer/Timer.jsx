import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from '../buttons/PlayButton';
import PauseButton from '../buttons/PauseButton';
import SettingsButton from '../buttons/SettingsButton';
import { useContext, useState, useEffect, useRef } from 'react';
import TimerSettingsContext from '../timer-settings/TimerSettingsContext';
import './timer.scss';
import '../../assets/styles/_variables.scss';

const Timer = () => {
    const {
        workMinutes,
        breakMinutes,
        setShowSettings,
    } = useContext(TimerSettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work'); // 'work' or 'break'
    const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    const tick = () => {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    };

    const switchMode = () => {
        const nextMode = modeRef.current === 'work' ? 'break' : 'work';
        const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    };

    useEffect(() => {
        secondsLeftRef.current = workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) return;
            if (secondsLeftRef.current === 0) switchMode();
            else tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [workMinutes, breakMinutes]);

    useEffect(() => {
        const mainBgColor = mode === 'work' ? 'var(--accent-red)' : 'var(--accent-green)';
        document.body.style.setProperty('--main-bg-color', mainBgColor);
    }, [mode]);

    const totalSeconds = (mode === 'work' ? workMinutes : breakMinutes) * 60;
    const percentage = Math.round((secondsLeft / totalSeconds) * 100);
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = String(secondsLeft % 60).padStart(2, '0');

    const handleModeChange = (newMode) => {
        const nextSeconds = (newMode === 'work' ? workMinutes : breakMinutes) * 60;
        setMode(newMode);
        modeRef.current = newMode;
        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    };

    return (
        <div>
            <div className="mode-indicator">
                <button
                    className={`with-text ${mode === 'work' ? 'active' : ''}`}
                    onClick={() => handleModeChange('work')}
                >
                    Work
                </button>
                <button
                    className={`with-text ${mode === 'break' ? 'active' : ''}`}
                    onClick={() => handleModeChange('break')}
                >
                    Break
                </button>
            </div>

            <CircularProgressbar
                value={percentage}
                text={`${minutes}:${seconds}`}
                className={`timer-progress ${mode}`}
            />

            <div className="timer-controls">
                {isPaused ? (
                    <PlayButton onClick={() => {
                        setIsPaused(false);
                        isPausedRef.current = false;
                    }} />
                ) : (
                    <PauseButton onClick={() => {
                        setIsPaused(true);
                        isPausedRef.current = true;
                    }} />
                )}
            </div>

            <div className="timer-controls">
                <SettingsButton onClick={() => setShowSettings(true)} />
            </div>
        </div>
    );
};

export default Timer;
