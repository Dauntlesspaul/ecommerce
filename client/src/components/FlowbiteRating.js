import { Box, Rating, Typography, LinearProgress } from '@mui/material';

export function RateMe({ rate }) {
  const value = Number(rate).toFixed(1);
  const numericValue = Number(value); 
  let ratings;

  if (numericValue === 5.0) {
    ratings = [
      { label: '5 star', percent: 70 },
      { label: '4 star', percent: 17 },
      { label: '3 star', percent: 8 },
      { label: '2 star', percent: 4 },
      { label: '1 star', percent: 1 },
    ];
  } else if (numericValue === 3.0) {
    ratings = [
      { label: '5 star', percent: 10 },
      { label: '4 star', percent: 15 },
      { label: '3 star', percent: 70 },
      { label: '2 star', percent: 4 },
      { label: '1 star', percent: 1 },
    ];
  } else {
    ratings = [
      { label: '5 star', percent: 20 },
      { label: '4 star', percent: 67 },
      { label: '3 star', percent: 8 },
      { label: '2 star', percent: 4 },
      { label: '1 star', percent: 1 },
    ];
  }

  return (
    <Box className="w-full md:flex md:justify-between md:px-[7%] my-8">
      <Box className="flex items-center">
        <Typography variant="body2" fontWeight="700" fontSize="22px" color="textSecondary">
          {value}
        </Typography>
        <Rating
          className="ml-[5%] flex-grow"
          name="read-only"
          value={numericValue} // Pass the numeric value here
          precision={0.1}
          readOnly
        />
      </Box>
      <Box className="w-full md:ml-20">
        {ratings.map((rating, index) => (
          <Box key={index} display="flex" alignItems="center" mb={0.6}>
            <Typography variant="body2" fontSize={16} color="textSecondary" width="15%">
              {rating.label}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={rating.percent}
              sx={{
                width: '90%',
                height: 16, // Increase the height of the bars
                bgcolor: 'lightgray',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#FCC815',
                },
              }}
              style={{ marginLeft: 8, marginRight: 8 }}
            />
            <Typography variant="body2" width="15%" color="textSecondary">
              {rating.percent}%
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default RateMe;
