/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { useStyles } from './AutoCompleteInput.styles';

import { AutocompleteInputProps } from './AutoCompleteInput.types';
const AutocompleteInput = ({
  label,
  fetchSuggestions,
  onSuggestionSelected,
  style,
  value,
  clearOnSelect,
  isBankNameInput = false,
}: AutocompleteInputProps) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isQuerying, setIsQuerying] = useState(false);
  const styles = useStyles();
  useEffect(() => {
    if (value !== undefined && value !== query) {
      setQuery(value);
    }
  }, [value]);

  const handleSearch = async (text: any) => {
    setQuery(text);
    if (clearOnSelect && text === '') {
      clearOnSelect();
    }
    if (!text || text?.length < 1) {
      setSuggestions([]);
      setIsQuerying(false);
      return;
    }

    if (!isQuerying) {
      setIsQuerying(true);
      try {
        const response: any = await fetchSuggestions(text);
        setSuggestions(response?.data);
        setIsQuerying(false);
      } catch (error) {
        console.warn('Error fetching suggestions:', error);
        setIsQuerying(false);
      }
    }
  };

  return (
    <View style={style}>
      <Autocomplete
        data={suggestions}
        defaultValue={query}
        onChangeText={handleSearch}
        inputContainerStyle={styles.input}
        placeholder={label}
        flatListProps={{
          keyExtractor: (item, index) => String(index),
          nestedScrollEnabled: true,
          renderItem: ({ item }: any) => (
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setQuery(isBankNameInput ? item.bankName : item.bankCode);
                setSuggestions([]);
                onSuggestionSelected(item);
              }}
            >
              <Text style={styles.text}>{isBankNameInput ? item.bankName : item.bankCode}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
};

export default AutocompleteInput;
