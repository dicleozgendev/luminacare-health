// DRAFT consent / disclosure text (KVKK-style aydinlatma metni + acik riza).
//
// IMPORTANT — read this before using in production:
// This is a reasonable starting template, not a legal document. Health
// appointment data (and anything resembling a health complaint/reason for
// visit) is a "special category" of personal data under KVKK Art. 6, which
// generally requires explicit consent (or a narrow statutory exception for
// licensed healthcare providers). Before a real clinic uses this with real
// patients, a lawyer needs to review and adapt this text to that specific
// clinic (their legal entity name, their data retention period, their KVKK
// contact person, whether they're registered with VERBIS, etc.). Shipping
// this verbatim to a real client without legal review would be irresponsible.

export const CONSENT_VERSION = 'draft-v1';

export const CONSENT_TEXT_TR = `
KVKK Aydınlatma Metni ve Açık Rıza (TASLAK — kullanılmadan önce avukat onayı gereklidir)

Veri Sorumlusu: [Klinik/Hastane Tüzel Kişilik Adı Buraya Girilecek]

Bu form aracılığıyla toplanan ad-soyad, telefon, e-posta ve randevu notu bilgileriniz,
randevunuzun oluşturulması, hatırlatılması ve size ulaşılması amacıyla işlenecektir.
Randevu notunuz (şikayet/ziyaret sebebi) 6698 sayılı KVKK'nın 6. maddesi kapsamında
özel nitelikli kişisel veri sayılabilir ve yalnızca açık rızanızla işlenir.

Verileriniz, yasal saklama süresi boyunca güvenli şekilde saklanır, yalnızca yetkili
personel tarafından görüntülenebilir, ve KVKK'nın 11. maddesinde sayılan haklarınız
(bilgi talep etme, düzeltme, silme vb.) çerçevesinde [iletişim kanalı buraya girilecek]
üzerinden talepte bulunabilirsiniz.

[  ] Yukarıdaki metni okudum, randevu bilgilerimin belirtilen amaçla işlenmesine
    açık rızam vardır.
`.trim();

export const CONSENT_TEXT_EN = `
Data Processing Notice & Consent (DRAFT — requires legal review before real use)

Data controller: [Clinic/Hospital legal entity name goes here]

The name, phone, email and appointment note you submit through this form are
processed solely to create, remind you of, and follow up on your appointment.
Your note (reason for visit) may qualify as special category health data and
is only processed with your explicit consent.

Your data is retained for the legally required period, is only visible to
authorized staff, and you may exercise your data protection rights (access,
correction, deletion) via [contact channel goes here].

[  ] I have read the above and explicitly consent to my appointment data
    being processed for the stated purpose.
`.trim();
