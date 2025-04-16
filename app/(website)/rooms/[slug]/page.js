import React from 'react';
import RoomsTemplate from '@/_components/Rooms/RoomTemplate/RoomTemplate';

const RoomsPage = async ({ params }) => {

  const slugParam = await params;

  const slug = slugParam.slug

  return (
    <div>
      <RoomsTemplate roomname={slug} />
    </div>
  );
};

export default RoomsPage;
