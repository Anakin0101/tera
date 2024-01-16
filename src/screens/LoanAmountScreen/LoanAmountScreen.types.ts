import { FlatList, ListRenderItem, TextInput } from 'react-native';

export type DataType = ArrayLike<string> | undefined | null;

export type RenderItemT = ListRenderItem<string>;

export type InputRef = React.RefObject<TextInput>;

export type FlatListRef = React.RefObject<FlatList>;
