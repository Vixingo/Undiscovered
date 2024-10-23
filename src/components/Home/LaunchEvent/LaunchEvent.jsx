import bg from '../../../assets/images/launch-bg-player.png';
import Countdown from 'react-countdown';

const LaunchEvent = () => {
  const expectedDate = '2024-08-01T01:02:03';

  const timeInfoStyle = 'text-[30px] font-bold text-[#fff] ';
  const dateInfoStyle = 'text-base text-[#fff] leading-6';
  const timeDivStyle = 'flex flex-col gap-2 text-center';

  const renderer = ({ hours, minutes, seconds, days }) => {
    // Render a countdown
    return (
      <div className='flex items-center gap-8 lg:gap-[42px]'>
        <span className={timeDivStyle}>
          <p className={timeInfoStyle}>{days}</p>{' '}
          <p className={dateInfoStyle}>Days</p>{' '}
        </span>
        <span className={timeDivStyle}>
          <p className={timeInfoStyle}>{hours}</p>{' '}
          <p className={dateInfoStyle}>Hours</p>{' '}
        </span>
        <span className={timeDivStyle}>
          <p className={timeInfoStyle}>{minutes}</p>{' '}
          <p className={dateInfoStyle}>Minutes</p>{' '}
        </span>
        <span className={timeDivStyle}>
          <p className={timeInfoStyle}>{seconds}</p>{' '}
          <p className={dateInfoStyle}>Second</p>{' '}
        </span>
      </div>
    );
  };

  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className='w-full h-[294px]  bg-center bg-no-repeat bg-cover rounded-[15px] relative'>
      {/* text area */}
      <div className='pt-[65px] pl-4 lg:pl-[42px]'>
        <div>
          <p className='text-base text-[#fff] leading-7 '>
            We are almost ready
          </p>
          <h3 className='text-[22px] text-[#fff] leading-[34px]'>
            launching in
          </h3>
        </div>

        {/* timer wrapper */}
        <div className='pt-7'>
          <Countdown
            date={expectedDate}
            renderer={renderer}
          />
        </div>
      </div>
    </div>
  );
};

export default LaunchEvent;
