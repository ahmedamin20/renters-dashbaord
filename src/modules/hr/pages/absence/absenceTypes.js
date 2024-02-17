import { t } from 'i18next'

export const absenceTypes = [
  { id: 'attended', name: t('attended') },
  { id: 'absence', name: t('absence') },
  { id: 'permission', name: t('permission') },
  { id: 'holiday', name: t('holiday') },
  { id: 'patient', name: t('patient') },
  { id: 'occasion', name: t('occasion') },
]
export const absenceTypesEnum = {
  ATTENDED: 'attended',
  ABSENCE: 'absence',
  HOLIDAY: 'holiday',
  OCCASION: 'occasion',
  PERMISSION: 'permission',
  PATIENT: 'patient',
}
