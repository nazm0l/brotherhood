import PropTypes from 'prop-types';
// @mui
import { Card, CardHeader, Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {
  const data = [
    {
      title: 'Page Views',
      subheader: 'Total page views',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, fuga. Deserunt nostrum veniam repudiandae iste exercitationem facere totam architecto omnis.',
    },
    {
      title: 'Like Views',
      subheader: 'Total Likes',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, fuga. Deserunt nostrum veniam repudiandae iste exercitationem facere totam architecto omnis.',
    },
    {
      title: 'Page Deleted',
      subheader: 'Total page deleted',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, fuga. Deserunt nostrum veniam repudiandae iste exercitationem facere totam architecto omnis.',
    },
    {
      title: 'Page Views',
      subheader: 'Total page views',
      content:
        'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam, fuga. Deserunt nostrum veniam repudiandae iste exercitationem facere totam architecto omnis.',
    },
  ];

  return (
    <>
      <Card>
        {data.map((item, index) => (
          <Box key={index} borderBottom="2px solid #F1F1F1">
            <CardHeader title={item.title} subheader={item.subheader} />

            <Box sx={{ p: 3, pb: 1 }} dir="ltr">
              <Typography level="body1">{item.content}</Typography>
            </Box>
          </Box>
        ))}
      </Card>
    </>
  );
}
