import { AuthLayout } from '../layouts'
import { Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import React, { Component } from 'react'

export function SignUpScreen () {
    return (
        <AuthLayout
            title="Smarthome Register"
            description="Welcome to Smart World"
        >
            <TextInput
                className="p-5 rounded-xl text-lg bg-white"
                placeholder="Enter username"
            ></TextInput>
            <TextInput
                className="p-5 rounded-xl text-lg bg-white"
                placeholder="Enter Email"
            ></TextInput>
            <TextInput
                className="p-5 rounded-xl text-lg bg-white"
                placeholder="Password"
            ></TextInput>
            <TextInput
                className="p-5 rounded-xl text-lg bg-white"
                placeholder="Confirm Password"
            ></TextInput>
            <TouchableOpacity className="p-5 rounded-xl bg-[#FD6B68] mt-6">
                <Text className="text-lg text-center font-medium text-white">
                    Sign up
                </Text>
            </TouchableOpacity>
        </AuthLayout>
    )
}
