import PropTypes from 'prop-types';

const ReviewCard = ({ review }) => {
  return (
    <div className='p-5 bg-[#FFF] rounded-[10px] shadow-[0px_5px_10px_0px_rgba(0,0,0,0.09)] space-y-4 '>
      {/* top area */}
      <div className='flex items-center gap-4 pb-4'>
        {/* profile */}
        <div className='w-[70px] h-[70px] rounded-full overflow-hidden '>
          <img
            className='w-full h-full object-cover'
            src={review?.image}
            alt=''
          />
        </div>

        {/* profiler */}
        <div>
          <p className='text-[#333] font-medium text-base'>{review?.name}</p>

          {/* star wrapper */}
          <div className='flex items-center gap-1 pt-2'>
            {[1, 2, 3, 4, 5].slice(0, review.review_count).map((index) => (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='18'
                height='16'
                viewBox='0 0 18 16'
                fill='none'
                key={index}>
                <path
                  d='M13.9317 9.93301C13.7159 10.1422 13.6167 10.4447 13.6659 10.7413L14.4067 14.8413C14.4692 15.1888 14.3226 15.5405 14.0317 15.7413C13.7467 15.9497 13.3676 15.9747 13.0567 15.808L9.36591 13.883C9.23758 13.8147 9.09508 13.778 8.94925 13.7738H8.72341C8.64508 13.7855 8.56841 13.8105 8.49841 13.8488L4.80675 15.783C4.62425 15.8747 4.41758 15.9072 4.21508 15.8747C3.72175 15.7813 3.39258 15.3113 3.47341 14.8155L4.21508 10.7155C4.26425 10.4163 4.16508 10.1122 3.94925 9.89967L0.940079 6.98301C0.688412 6.73884 0.600912 6.37217 0.715912 6.04134C0.827579 5.71134 1.11258 5.47051 1.45675 5.41634L5.59841 4.81551C5.91341 4.78301 6.19008 4.59134 6.33175 4.30801L8.15674 0.566341C8.20008 0.483008 8.25591 0.406341 8.32341 0.341341L8.39841 0.283008C8.43758 0.239674 8.48258 0.203841 8.53258 0.174674L8.62341 0.141341L8.76508 0.0830078H9.11591C9.42924 0.115508 9.70508 0.303008 9.84925 0.583008L11.6984 4.30801C11.8317 4.58051 12.0909 4.76967 12.3901 4.81551L16.5317 5.41634C16.8817 5.46634 17.1742 5.70801 17.2901 6.04134C17.3992 6.37551 17.3051 6.74217 17.0484 6.98301L13.9317 9.93301Z'
                  fill='#FFB900'
                />
              </svg>
            ))}
          </div>
        </div>
      </div>
      {/* description */}
      <div className='text-[#333]  leading-6 text-base ml-[30px]'>
        "{review?.testimonial}"
      </div>
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.object,
};

export default ReviewCard;
