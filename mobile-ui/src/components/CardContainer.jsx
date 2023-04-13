import { View } from 'react-native'

function CardContainer ({ children }) {
    return (
        <View className="h-[500] min-w-[300] w-full flex flex-col bg-slate-300 rounded-[20px] p-6">
            {children}
        </View>
    )
}

export default CardContainer
