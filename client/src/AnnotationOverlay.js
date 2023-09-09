// AnnotationOverlay.js

import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: 'transparent',
    },
    annotation: {
        position: 'absolute',
        borderColor: 'red',
        borderWidth: 1,
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
    },
    text: {
        color: 'red',
    },
});

function AnnotationOverlay({ annotations }) {
    return (
        <Document>
            {annotations.map((annotation, index) => (
                <Page
                    key={`page_${annotation.page}_${index}`}
                    style={styles.page}
                    size="A4"
                >
                    <View
                        style={[
                            styles.annotation,
                            {
                                left: annotation.x,
                                top: annotation.y,
                                width: 100, // Adjust as needed
                                height: 20, // Adjust as needed
                            },
                        ]}
                    >
                        <Text style={styles.text}>{annotation.text}</Text>
                    </View>
                </Page>
            ))}
        </Document>
    );
}

export default AnnotationOverlay;
