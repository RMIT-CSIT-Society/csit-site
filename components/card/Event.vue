<template>
  <Cell class="large-4" id="events-card">
    <a :href="url">
      <img :src="featureImage.url" alt="" />
      <h3>{{ name }}</h3>
      <p>{{ startDate }}</p>
      <p>{{ endDate }}</p>

      <NuxtLink class="button" to="#">View Event</NuxtLink>
    </a>
  </Cell>
</template>

<script setup lang="ts">
interface HumantixEvent {
  _id: string;
  userId: string;
  organiserId: string;
  currency: string;
  name: string;
  description: string;
  slug: string;
  url: string;
  tagIds: string[];
  category: string;
  classification: {
    type: string;
    category: string;
    subcategory: string;
  };
  artists: {
    origin: string;
    name: string;
    externalId: string;
  }[];
  public: boolean;
  published: boolean;
  suspendSales: boolean;
  markedAsSoldOut: boolean;
  startDate: string;
  endDate: string;
  timezone: string;
  totalCapacity: number;
  ticketTypes: {
    _id: string;
    name: string;
    price: number;
    priceRange: {
      enabled: boolean;
      min: number;
      max: number;
    };
    priceOptions: {
      enabled: boolean;
      options: { value: string }[];
    };
    quantity: number;
    description: string;
    disabled: boolean;
    deleted: boolean;
    isDonation: boolean;
  }[];
  pricing: {
    minimumPrice: number;
    maximumPrice: number;
  };
  paymentOptions: {
    refundSettings: {
      refundPolicy: string;
      customRefundPolicy: string;
    };
  };
  publishedAt: string;
  additionalQuestions: {
    _id: string;
    inputType: string;
    question: string;
    required: boolean;
    description: string;
    perOrder: boolean;
    disabled: boolean;
    createdAt: string;
    updatedAt: string;
  }[];
  bannerImage: { url: string };
  featureImage: { url: string };
  socialImage: { url: string };
  eventLocation: {
    type: string;
    venueName: string;
    address: string;
    latLng: [number, number];
    instructions: string;
    placeId: string;
    onlineUrl: string;
    mapUrl: string;
    city: string;
    region: string;
    country: string;
  };
  dates: {
    _id: string;
    startDate: string;
    endDate: string;
    scheduleId: string;
    disabled: boolean;
    deleted: boolean;
  }[];
  packagedTickets: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    description: string;
    disabled: boolean;
    deleted: boolean;
    tickets: { ticketTypeId: string; quantity: number }[];
  }[];
  accessibility: {
    contactName: string;
    contactNumber: string;
    travelInstructions: string;
    entryInstructions: string;
    afterEntryInstructions: string;
    hazards: string;
    toiletLocation: string;
    disabledParking: string;
    features: {
      access: boolean;
      wheelchairAccessibility: boolean;
      audioDescription: boolean;
      telephoneTypewriter: boolean;
      volumeControlTelephone: boolean;
      assistiveListeningSystems: boolean;
      signLanguageInterpretation: boolean;
      accessiblePrint: boolean;
      closedCaptioning: boolean;
      openedCaptioning: boolean;
      brailleSymbol: boolean;
    };
  };
  affiliateCode: { code: string };
  keywords: string[];
  location: string;
  createdAt: string;
  updatedAt: string;
}

const props = defineProps<HumantixEvent>();
</script>

<style scoped></style>
