// ResultsList.tsx
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

interface ResultsListProps {
  data: any[];
  keyExtractor: (item: any) => string;
  renderItem: ListRenderItem<any>;
}

const ResultsList: React.FC<ResultsListProps> = ({
  data,
  keyExtractor,
  renderItem,
}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      horizontal
      decelerationRate="fast"
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default ResultsList;
