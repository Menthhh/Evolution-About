// @ts-nocheck
import React from 'react';
import { Box, Typography, Pagination } from '@mui/material';
import RecommendBox from './RecommendBox';
import { theme } from '@/theme/index';

const RecommendSection = ({
  title,
  recommend = [],
  total = 0,
  currentPage = 1,
  setPage,
  limit = 5,
  type,
  removeItem,
  totalItem
}) => {
  // Handle empty or invalid data
  if (!Array.isArray(recommend)) {
    return null;
  }

  // Calculate pagination values
  const totalPages = Math.ceil(total);
  const startIndex = (currentPage - 1) * limit;
  const endIndex = Math.min(startIndex + limit, total);

  // Handle page change
  const handlePageChange = (_, page) => {
    setPage(page);
  };

  // Get content name based on type
  const getContentName = (item) => {
    switch (type) {
      case 'videos-podcasts':
        return item.vpName;
      case 'articles':
        return item.artName;
      case 'books':
        return item.bName;
      default:
        return '';
    }
  };

  return (
    <Box className="w-full rounded-xl bg-gray-100">
      {/* Header */}
      <Box p={2} bgcolor={theme.palette.main.main}>
        <Typography variant='heading3'>
          {title}
        </Typography>
      </Box>

      {/* Content */}
      <Box className="flex flex-col">
        {recommend.map((item, index) => (
          <RecommendBox
            key={`${type}-${item._id}-${index}`}
            rec={getContentName(item)}
            removeItem={removeItem}
            id={item._id}
            type={type}
          />
        ))}
      </Box>

      {/* Pagination Footer */}
      <Box className="flex items-center justify-between border-t border-gray-200 p-4">

        {totalPages > 1 && (
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}

            size="small"
            showFirstButton
            showLastButton
            className="ml-4"
            color="secondary"

          />
        )}
      </Box>
    </Box>
  );
};

export default RecommendSection;