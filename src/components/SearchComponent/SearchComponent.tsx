import React, { FC } from 'react';
import { View, Pressable, TextInput } from 'react-native';
import { SearchProps } from './SearchComponent.types';
import { useStyleTheme } from './SearchComponent.styles';
import { ClearSearch, Search } from 'assets/SVGs';
import { Colors } from 'theme/Variables';

export const SearchComponent: FC<SearchProps> = ({
  value = '',
  onChangeText = () => {},
  onSubmitEditing = () => {},
  placeholder = '',
  autoFocus = false,
  onClearTextOnPress = () => {},
  customWrapperStyle = {},
}) => {
  const styles = useStyleTheme();

  const onClearText = () => {
    onChangeText('');
    onClearTextOnPress();
  };
  return (
    <View>
      <View style={[styles.container, customWrapperStyle]}>
        <Search />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          returnKeyType="search"
          placeholderTextColor={Colors.textBlack400}
          multiline={false}
          numberOfLines={1}
          value={value}
          onChangeText={onChangeText}
          onSubmitEditing={onSubmitEditing}
          autoFocus={autoFocus}
          spellCheck={true}
          maxFontSizeMultiplier={1}
        />
        {!!value && (
          <Pressable
            style={styles.closeIcon}
            hitSlop={{ top: 20, right: 20, bottom: 20, left: 20 }}
            onPress={onClearText}
          >
            <ClearSearch />
          </Pressable>
        )}
      </View>
    </View>
  );
};
