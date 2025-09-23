import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchImageLibrary } from 'react-native-image-picker';
import { useTranslation } from 'react-i18next';
import apiClient from '../../api/client';

const ReportHazardScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const [eventType, setEventType] = useState('');
  const [reportCategory, setReportCategory] = useState('Observation');
  const [description, setDescription] = useState('');
  const [locationDescription, setLocationDescription] = useState('');
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<
    { uri: string; fileName?: string; type: 'Image' | 'Video' }[]
  >([]);
  const [submitting, setSubmitting] = useState(false);

  const eventTypes = [
    t('report.eventTypes.tsunami'),
    t('report.eventTypes.highWave'),
    t('report.eventTypes.flooding'),
    t('report.eventTypes.stormSurge'),
    t('report.eventTypes.sos'),
    t('report.eventTypes.other'),
  ];
  const reportCategories = [
    t('report.categories.observation'),
    t('report.categories.sos'),
  ];

  const fetchUserLocation = useCallback(() => {
    setLoadingLocation(true);
    Geolocation.getCurrentPosition(
      position => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        setLoadingLocation(false);
      },
      () => {
        Alert.alert(
          t('report.alert.locationErrorTitle'),
          t('report.alert.locationErrorMessage'),
        );
        setLoadingLocation(false);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  }, [t]);

  useEffect(() => {
    fetchUserLocation();
  }, [fetchUserLocation]);

const handleMediaUpload = (type: 'photo' | 'video') => {
    launchImageLibrary(
        {
            mediaType: type,
            quality: 1,
            selectionLimit: 5,
        },
        response => {
            if (response.didCancel) {
                return;
            }
            if (response.errorCode) {
                console.log('Picker Error:', response.errorCode);
                return;
            }
            if (response.assets) {

                // Step 1: Filter out any assets that do not have a valid URI.
                // This guarantees the 'uri' property exists for the next step.
                const validAssets = response.assets.filter(asset => asset.uri !== null && asset.uri !== undefined);

                // Step 2: Now, map the filtered, valid assets to the correct structure.
                // The TypeScript compiler is now happy because it knows 'uri' is present.
                const newFiles = validAssets.map(asset => ({
                    uri: asset.uri!, // '!' is now safe because we've filtered
                    fileName: asset.fileName,
                    type: (asset.type?.startsWith('image') ? 'Image' : 'Video') as 'Image' | 'Video',
                }));

                setMediaFiles(prev => [...prev, ...newFiles]);
            }
        },
    );
};

  const handleReport = async () => {
    if (!eventType || !description || !coords) {
      Alert.alert(
        t('report.alert.incompleteFormTitle'),
        t('report.alert.incompleteFormMessage'),
      );
      return;
    }

    setSubmitting(true);
    try {
      const form = new FormData();
      form.append('event_type', eventType);
      form.append('report_category', reportCategory);
      form.append('description', description);
      form.append('location_description', locationDescription);
      form.append('latitude', coords.latitude.toString());
      form.append('longitude', coords.longitude.toString());

      mediaFiles.forEach((file, idx) => {
        form.append('media', {
          uri: file.uri,
          type: file.type === 'Image' ? 'image/jpeg' : 'video/mp4',
          name: file.fileName || `file-${idx}`,
        } as any);
      });

      await apiClient.post('/reports', form);

      Alert.alert(
        t('report.alert.successTitle'),
        t('report.alert.successMessage'),
      );
      navigation.goBack();
    } catch (err: any) {
      const message =
        err.response?.data?.message || err.message || 'Submission failed';
      Alert.alert(t('report.alert.errorTitle'), message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('report.headerTitle')}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.inputLabel}>{t('report.eventTypeLabel')} *</Text>
        <View style={styles.selectorContainer}>
          {eventTypes.map(type => (
            <TouchableOpacity
              key={type}
              style={[
                styles.selectorButton,
                eventType === type && styles.selectorButtonActive,
              ]}
              onPress={() => setEventType(type)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  eventType === type && styles.selectorButtonTextActive,
                ]}
              >
                {type}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>{t('report.categoryLabel')} *</Text>
        <View style={styles.selectorContainer}>
          {reportCategories.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.selectorButton,
                reportCategory === cat && styles.selectorButtonActive,
              ]}
              onPress={() => setReportCategory(cat)}
            >
              <Text
                style={[
                  styles.selectorButtonText,
                  reportCategory === cat && styles.selectorButtonTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.inputLabel}>{t('report.descriptionLabel')} *</Text>
        <TextInput
          style={styles.descriptionInput}
          placeholder={t('report.descriptionPlaceholder')}
          multiline
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.inputLabel}>{t('report.locationLabel')} *</Text>
        <View style={styles.locationContainer}>
          {loadingLocation ? (
            <ActivityIndicator size="small" color="#138D35" />
          ) : coords ? (
            <Text style={styles.locationText}>
              Lat: {coords.latitude.toFixed(4)}, Long:{' '}
              {coords.longitude.toFixed(4)}
            </Text>
          ) : (
            <Text style={styles.locationText}>
              {t('report.locationNotAvailable')}
            </Text>
          )}
          <TouchableOpacity
            onPress={fetchUserLocation}
            style={styles.refreshButton}
          >
            <Icon name="refresh" size={20} color="#138D35" />
            <Text style={styles.refreshText}>{t('report.refreshButton')}</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.inputLabel}>
          {t('report.locationDescriptionLabel')}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={t('report.locationDescriptionPlaceholder')}
          value={locationDescription}
          onChangeText={setLocationDescription}
        />

        <Text style={styles.inputLabel}>{t('report.mediaLabel')}</Text>
        <View style={styles.uploadButtonsContainer}>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleMediaUpload('photo')}
          >
            <Icon name="image-outline" size={24} color="#333" />
            <Text style={styles.uploadButtonText}>
              {t('report.uploadImageButton')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => handleMediaUpload('video')}
          >
            <Icon name="video-outline" size={24} color="#333" />
            <Text style={styles.uploadButtonText}>
              {t('report.uploadVideoButton')}
            </Text>
          </TouchableOpacity>
        </View>

        {mediaFiles.length > 0 && (
          <View style={styles.mediaPreviewContainer}>
            <Text style={styles.mediaPreviewTitle}>
              {t('report.selectedFilesTitle')}
            </Text>
            {mediaFiles.map((file, idx) => (
              <View key={idx} style={styles.mediaItem}>
                {file.type === 'Image' ? (
                  <Image source={{ uri: file.uri }} style={styles.mediaImage} />
                ) : (
                  <View style={styles.videoPlaceholder}>
                    <Icon name="play-circle-outline" size={24} color="#fff" />
                    <Text style={styles.videoPlaceholderText}>
                      {t('report.videoPlaceholder')}
                    </Text>
                  </View>
                )}
                <Text style={styles.mediaFileName}>{file.fileName}</Text>
              </View>
            ))}
          </View>
        )}

        <TouchableOpacity
          style={styles.mainButton}
          onPress={handleReport}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.mainButtonText}>
              {t('report.submitButton')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 20,
  },
  inputLabel: {
    width: '100%',
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 5,
    marginTop: 15,
  },
  selectorContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  selectorButton: {
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: '30%',
    alignItems: 'center',
  },
  selectorButtonActive: {
    backgroundColor: '#D4EDDA',
    borderColor: '#138D35',
  },
  selectorButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '600',
  },
  selectorButtonTextActive: {
    color: '#138D35',
  },
  descriptionInput: {
    height: 100,
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 15,
    paddingTop: 15,
    fontSize: 16,
  },
  locationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginTop: 5,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  refreshText: {
    marginLeft: 5,
    color: '#138D35',
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
  uploadButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    borderRadius: 8,
    paddingVertical: 15,
    width: '48%',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  uploadButtonText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  mediaPreviewContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    padding: 15,
    backgroundColor: '#fafafa',
  },
  mediaPreviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  mediaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mediaImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  videoPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#555',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoPlaceholderText: {
    color: '#fff',
    fontSize: 12,
  },
  mediaFileName: {
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  mainButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#138D35',
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  mainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default ReportHazardScreen;
