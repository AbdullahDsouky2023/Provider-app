import React from 'react'
import HeaderTextComponent from './HeaderTextComponent'
import { workerList } from '../../data/home'
import { Dimensions, FlatList, Text } from 'react-native'
import HelpCard from './HelpCard'
const { width } = Dimensions.get('screen')
export default function AskWorker() {
  return (
    <HeaderTextComponent name={'AskWorkerToHelp'}>
       <FlatList
        
        data={workerList}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item,index) => item.name+index}

        style={{
            display:'flex',
            flexDirection:'row',
            direction:'rtl',
            flexWrap:'wrap',
            marginTop:15,
            gap:15,
            width:width
        }}
        renderItem={({item})=>(
            <HelpCard
            name={item.name}
            image={item.image}
            />
           

        )}
        />
    </HeaderTextComponent>
  )
}
