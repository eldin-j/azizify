import ReactSlider from 'react-slider';
import './slider.scss';
import TimerSettingsContext from './TimerSettingsContext';
import { useContext } from 'react';
import BackButton from '../buttons/BackButton';

const TimerSettings = () => {
    const {
        workMinutes,
        setWorkMinutes,
        breakMinutes,
        setBreakMinutes,
        setShowSettings,
    } = useContext(TimerSettingsContext);

    return (
        <div style={{ textAlign: 'left' }}>
            <label>
                Work: <b>{workMinutes}</b> minutes
            </label>
            <ReactSlider
                className="slider"
                thumbClassName="thumb"
                trackClassName="track"
                value={workMinutes}
                onChange={(newValue) => setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label>
                Break: <b>{breakMinutes}</b> minutes
            </label>
            <ReactSlider
                className="slider green"
                thumbClassName="thumb"
                trackClassName="track"
                value={breakMinutes}
                onChange={(newValue) => setBreakMinutes(newValue)}
                min={1}
                max={30}
            />
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
                <BackButton onClick={() => setShowSettings(false)} />
            </div>
        </div>
    );
};

export default TimerSettings;
