import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native";

function Overview({data}) {
 
  const cleanHTML = (html) => {
      return html.replace(/<[^>]*>?/gm, "");
    };
    
    return (
        <ScrollView style={{ flex: 1 ,paddingHorizontal:10,paddingVertical:8  }}>

      <Text style={{ fontSize: 15 ,paddingBottom:7  }}>
        {cleanHTML(data.description)}
      </Text>
     
    </ScrollView>
  );
}
export default Overview;
const style = StyleSheet.create({});
