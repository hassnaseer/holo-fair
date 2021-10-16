<template>
<div class="row">
<div class="col-lg-12 mx-auto">
  <v-card>
      <v-card-title>
          Black data here
      </v-card-title>
  </v-card>
</div>
 <v-col cols="1" lg="1" md="1" sm="1" class="pl-12">
<a-icon type="exclamation-circle" :style="{ fontSize: '30px'}"/>
  </v-col>
  <v-col col="10" lg="10" md="10" sm="10">
    <h3>Max.Upload Size is : 2MB,</h3>
    <h3>Recomended size is 2000* 800 px (5:2)</h3>
  </v-col>
<v-col cols="2" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Cancel</v-btn>
        </v-col>
        <v-col cols="2" class="text-center">
          <v-btn :loading="loading" type="submit" color="light-blue darken-2 px-8" dark> Save</v-btn>
        </v-col>
</div>
</template>