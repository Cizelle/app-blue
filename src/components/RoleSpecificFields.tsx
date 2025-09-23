/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

interface RoleSpecificFieldsProps {
  role: 'official' | 'analyst';
  designation: string;
  setDesignation: (text: string) => void;
  organizationName: string;
  setOrganizationName: (text: string) => void;
  employeeId: string;
  setEmployeeId: (text: string) => void;
  idProofUri: string | undefined;
  setIdProofUri: (uri: string | undefined) => void;
  authorizationLetterUri: string | undefined;
  setAuthorizationLetterUri: (uri: string | undefined) => void;
}

const RoleSpecificFields: React.FC<RoleSpecificFieldsProps> = ({
  role,
  designation,
  setDesignation,
  organizationName,
  setOrganizationName,
  employeeId,
  setEmployeeId,
  idProofUri,
  setIdProofUri,
  authorizationLetterUri,
  setAuthorizationLetterUri,
}) => {
  const { t } = useTranslation();

  const handleDocumentPick = async (setter: (uri: string | undefined) => void) => {
    const result = await launchImageLibrary({ mediaType: "photo", selectionLimit: 1 });
    if (result.assets && result.assets.length > 0) {
      setter(result.assets[0].uri);
    }
  };

  // Dynamically get the role title for the header
  const roleTitle = role === 'official' ? t('roles.official.title') : t('roles.analyst.title');

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{t('roleSpecificFields.sectionTitle', { role: roleTitle })}</Text>

      <Text style={styles.inputLabel}>{t('roleSpecificFields.labels.designation')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('roleSpecificFields.placeholders.designation')}
        value={designation}
        onChangeText={setDesignation}
      />

      <Text style={styles.inputLabel}>{t('roleSpecificFields.labels.organizationName')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('roleSpecificFields.placeholders.organizationName')}
        value={organizationName}
        onChangeText={setOrganizationName}
      />

      <Text style={styles.inputLabel}>{t('roleSpecificFields.labels.employeeId')}</Text>
      <TextInput
        style={styles.input}
        placeholder={t('roleSpecificFields.placeholders.employeeId')}
        value={employeeId}
        onChangeText={setEmployeeId}
      />

      <Text style={styles.inputLabel}>{t('roleSpecificFields.labels.idProofDocument')}</Text>
      <TouchableOpacity
        style={styles.documentUploadButton}
        onPress={() => handleDocumentPick(setIdProofUri)}
      >
        <Icon name="file-upload" size={20} color="#138D35" />
        <Text style={styles.documentUploadButtonText}>
          {idProofUri ? t('roleSpecificFields.documentUploads.changeDocument') : t('roleSpecificFields.documentUploads.uploadIdProof')}
        </Text>
      </TouchableOpacity>
      {idProofUri && <Text style={styles.documentName}>{idProofUri.split('/').pop()}</Text>}
      <Text style={styles.requiredText}>{t('roleSpecificFields.requiredText')}</Text>


      <Text style={styles.inputLabel}>{t('roleSpecificFields.labels.authorizationLetter')}</Text>
      <TouchableOpacity
        style={styles.documentUploadButton}
        onPress={() => handleDocumentPick(setAuthorizationLetterUri)}
      >
        <Icon name="file-upload" size={20} color="#138D35" />
        <Text style={styles.documentUploadButtonText}>
          {authorizationLetterUri ? t('roleSpecificFields.documentUploads.changeDocument') : t('roleSpecificFields.documentUploads.uploadAuthorizationLetter')}
        </Text>
      </TouchableOpacity>
      {authorizationLetterUri && <Text style={styles.documentName}>{authorizationLetterUri.split('/').pop()}</Text>}
      <Text style={styles.requiredText}>{t('roleSpecificFields.requiredText')}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: '5%', // Match parent padding
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#138D35',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 10,
  },
  input: {
    width: '100%',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    marginBottom: 10,
    fontSize: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  documentUploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D4EDDA', // Light green background
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '100%',
    justifyContent: 'center',
    marginBottom: 5,
    borderColor: '#138D35',
    borderWidth: 1,
  },
  documentUploadButtonText: {
    marginLeft: 10,
    color: '#138D35',
    fontSize: 16,
    fontWeight: '600',
  },
  documentName: {
    fontSize: 12,
    color: '#555',
    marginTop: 5,
    marginBottom: 5,
    textAlign: 'center',
  },
  requiredText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default RoleSpecificFields;