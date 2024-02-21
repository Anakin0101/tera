// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity } from 'react-native';
// import { TextInput } from 'components';
// import Autocomplete from 'react-native-autocomplete-input';

// const AutocompleteInput = ({ label, fetchSuggestions, onSuggestionSelected, style }) => {
//   const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);
//   const [isQuerying, setIsQuerying] = useState(false);

//   // This function is called whenever the text input changes
//   const handleSearch = async text => {
//     setQuery(text);
//     if (!text || text.length < 3) {
//       setSuggestions([]);
//       setIsQuerying(false);
//       return;
//     }

//     if (!isQuerying) {
//       setIsQuerying(true);
//       try {
//         const response = await fetchSuggestions(text);
//         setSuggestions(response?.data); // Set the suggestions returned from the API
//         setIsQuerying(false);
//       } catch (error) {
//         console.error('Error fetching suggestions:', error);
//         setIsQuerying(false);
//       }
//     }
//   };

//   return (
//     <View style={style}>
//       <Autocomplete
//         data={suggestions}
//         defaultValue={query}
//         onChangeText={handleSearch}
//         placeholder={label}
//         keyExtractor={(item, index) => String(index)}
//         flatListProps={{
//           keyExtractor: (item, index) => String(index), // Key extractor for the FlatList
//           nestedScrollEnabled: true, // If you want the list to be scrollable within a ScrollView
//           renderItem: ({ item }) => (
//             <TouchableOpacity
//               onPress={() => {
//                 setQuery(item.bankName); // Assuming the suggestion has a 'name' property
//                 setSuggestions([]);
//                 onSuggestionSelected(item); // Handle the selection of the suggestion
//               }}
//             >
//               <Text style={{ padding: 10 }}>{item.bankName}</Text>
//             </TouchableOpacity>
//           ),
//         }}
//       />
//     </View>
//   );
// };

// export default AutocompleteInput;
