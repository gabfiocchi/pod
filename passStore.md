passKeystore: pod123

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore pod-key.keystore /Users/tomasstambulsky/Documents/GitHub/pod/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk alias_name

./zipalign -v 4 /Users/tomasstambulsky/Documents/GitHub/pod/platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk  android-release.apk