// Import React and React Native components
import React from 'react';
import {Button, View} from 'react-native';

// Import the packages for file system, printing, and sharing
import * as FileSystem from 'expo-file-system';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useDispatch, useSelector } from "react-redux";
import { Dimensions } from 'react-native';
import AppButton from '../AppButton';
const { width , height } = Dimensions.get('screen')
// Define the DocumentDownloadComponent
const DocumentDownloadComponent = () => {
    const pdfWidth = Print.width;
    const pdfHeight = Print.height;
    
    // Get the number of pixels per inch on the device screen
    const pixelsPerInch = Print.pixelsPerInch;
    
    // Convert the PDF dimensions from points to pixels
    const pdfWidthInPixels = pdfWidth * pixelsPerInch / 72;
    const pdfHeightInPixels = pdfHeight * pixelsPerInch / 72;
    const userData = useSelector((state)=>state?.user?.userData)
    const personalImageSource=  userData?.attributes?.Personal_image?.data[0]?.attributes?.url
    const  PersonalCardSource=  userData?.attributes?.Personal_card?.data[0]?.attributes?.url
    const CommercialRecordSource=  userData?.attributes?.Commercial_record?.data[0]?.attributes?.url
    const professionalLicenceSource=  userData?.attributes?.professional_licence?.data[0]?.attributes?.url
    // Define the function that handles the button press
  // Define the function that downloads the images
  async function handlePress() {
    try {
      // Download the images
      const images = await downloadImages();

      // Create the PDF file
      const pdf = await createPDF(images);

      // Share the PDF file
      await sharePDF(pdf);
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  }
  async function downloadImages() {
    // Create a folder in the cache directory to store the images
    const folder = FileSystem.cacheDirectory + 'images/';
    await FileSystem.makeDirectoryAsync(folder, {intermediates: true});
    // Download the images from the URLs and save them to the folder
    const personalImage = await FileSystem.downloadAsync(
        personalImageSource
      ,
      folder + 'personal.jpg'
    );
    const Personal_card = await FileSystem.downloadAsync(
        PersonalCardSource
      ,
      folder + 'Personal_card.jpg'
    );
    const Commercial_record= await FileSystem.downloadAsync(
        CommercialRecordSource
      ,
      folder + 'Commercial_record.jpg'
    );
    const professional_licence= await FileSystem.downloadAsync(
        professionalLicenceSource
      ,
      folder + 'professional_licence.jpg'
    );
   
        console.log("the current useri ",[personalImage])
    // Return the local URIs of the images
    return [personalImage.uri, Commercial_record.uri,personalImage.uri,professional_licence?.uri];
  }

  // Define the function that creates the PDF file
  async function createPDF(images) {
    // Create a HTML string that contains the images
    const html = `
      <html>
        <head>
          <style>
            img {
              width: 100%;
              height:  100%; // Divide by 4 because there are 4 images
              object-fit:fit
            }
          </style>
        </head>
        <body>
        <div style="width: ${pdfWidthInPixels}px; height: ${pdfHeightInPixels}px;">
        <img src="${personalImageSource}" />
      </div>
        <div style="width: ${pdfWidthInPixels}px; height: ${pdfHeightInPixels}px;">
        <img src="${PersonalCardSource}" />
      </div>
        <div style="width: ${pdfWidthInPixels}px; height: ${pdfHeightInPixels}px;">
        <img src="${CommercialRecordSource}" />
      </div>
        <div style="width: ${pdfWidthInPixels}px; height: ${pdfHeightInPixels}px;">
        <img src="${professionalLicenceSource}" />
      </div>
      
        </body>
      </html>
    `;

    // Create a PDF file from the HTML string and save it to the cache directory
    const pdf = await Print.printToFileAsync({
      html,
      width: pdfWidth, // Use the default width in points
      height: pdfHeight, 
      base64: false,
      orientation: Print.Orientation.portrait,
    });

    // Return the local URI of the PDF file
    return pdf.uri;
  }

  // Define the function that shares the PDF file
  async function sharePDF(pdf) {
    // Share the PDF file with other apps
    await Sharing.shareAsync(pdf);
  }

  // Render the button component
  return (
    <View>
      <AppButton title="Download Docs" onPress={handlePress} />
    </View>
  );
};

// Export the component
export default DocumentDownloadComponent;
