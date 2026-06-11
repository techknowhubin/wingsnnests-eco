import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Marquee from "@/components/Marquee";
import DestinationCard from "@/components/DestinationCard";
import { motion } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import agraImg from "@/assets/destinations/agra.jpg";
import ahmedabadImg from "@/assets/destinations/ahmedabad.jpg";
import alleppeyImg from "@/assets/destinations/alleppey.jpg";
import alongImg from "@/assets/destinations/along.jpg";
import amritsarImg from "@/assets/destinations/amritsar.jpg";
import anantapurImg from "@/assets/destinations/anantapur.jpg";
import arakuImg from "@/assets/destinations/araku.jpg";
import auliImg from "@/assets/destinations/auli.jpg";
import bengaluruImg from "@/assets/destinations/bengaluru.jpg";
import bhadrachalamImg from "@/assets/destinations/bhadrachalam.jpg";
import bheemiliImg from "@/assets/destinations/bheemili.jpg";
import bodhgayaImg from "@/assets/destinations/bodhgaya.jpg";
import bomdilaImg from "@/assets/destinations/bomdila.jpg";
import chaibasaImg from "@/assets/destinations/chaibasa.jpg";
import chennaiImg from "@/assets/destinations/chennai.jpg";
import cherrapunjiImg from "@/assets/destinations/cherrapunji.jpg";
import coorgImg from "@/assets/destinations/coorg.jpg";
import dalhousieImg from "@/assets/destinations/dalhousie.jpg";
import darjeelingImg from "@/assets/destinations/darjeeling.jpg";
import deogharImg from "@/assets/destinations/deoghar.jpg";
import dharamshalaImg from "@/assets/destinations/dharamshala.jpg";
import dibrugarhImg from "@/assets/destinations/dibrugarh.jpg";
import dwarkaImg from "@/assets/destinations/dwarka.jpg";
import faridabadImg from "@/assets/destinations/faridabad.jpg";
import gandikotaImg from "@/assets/destinations/gandikota.jpg";
import gangtokImg from "@/assets/destinations/gangtok.jpg";
import goaImg from "@/assets/destinations/goa.jpg";
import gokarnaImg from "@/assets/destinations/gokarna.jpg";
import gulmargImg from "@/assets/destinations/gulmarg.jpg";
import gunturImg from "@/assets/destinations/guntur.jpg";
import gurugramImg from "@/assets/destinations/gurugram.jpg";
import guwahatiImg from "@/assets/destinations/guwahati.jpg";
import hampiImg from "@/assets/destinations/hampi.jpg";
import horsleyhillsImg from "@/assets/destinations/horsleyhills.jpg";
import hyderabadImg from "@/assets/destinations/hyderabad.jpg";
import itanagarImg from "@/assets/destinations/itanagar.jpg";
import jaipurImg from "@/assets/destinations/jaipur.jpg";
import jaisalmerImg from "@/assets/destinations/jaisalmer.jpg";
import jamshedpurImg from "@/assets/destinations/jamshedpur.jpg";
import jodhpurImg from "@/assets/destinations/jodhpur.jpg";
import jorhatImg from "@/assets/destinations/jorhat.jpg";
import kadapaImg from "@/assets/destinations/kadapa.jpg";
import kasauliImg from "@/assets/destinations/kasauli.jpg";
import kasolImg from "@/assets/destinations/kasol.jpg";
import katraImg from "@/assets/destinations/katra.jpg";
import kazirangaImg from "@/assets/destinations/kaziranga.jpg";
import kochiImg from "@/assets/destinations/kochi.jpg";
import kodaikanalImg from "@/assets/destinations/kodaikanal.jpg";
import kolkataImg from "@/assets/destinations/kolkata.jpg";
import kurnoolImg from "@/assets/destinations/kurnool.jpg";
import kurukshetraImg from "@/assets/destinations/kurukshetra.jpg";
import lambasingiImg from "@/assets/destinations/lambasingi.jpg";
import lehImg from "@/assets/destinations/leh.jpg";
import lepakshiImg from "@/assets/destinations/lepakshi.jpg";
import lonavalaImg from "@/assets/destinations/lonavala.jpg";
import mahabaleshwarImg from "@/assets/destinations/mahabaleshwar.jpg";
import manaliImg from "@/assets/destinations/manali.jpg";
import medakImg from "@/assets/destinations/medak.jpg";
import mumbaiImg from "@/assets/destinations/mumbai.jpg";
import munnarImg from "@/assets/destinations/munnar.jpg";
import mussoorieImg from "@/assets/destinations/mussoorie.jpg";
import mysoreImg from "@/assets/destinations/mysore.jpg";
import nagarjunasagarImg from "@/assets/destinations/nagarjunasagar.jpg";
import naharlagunImg from "@/assets/destinations/naharlagun.jpg";
import nainitalImg from "@/assets/destinations/nainital.jpg";
import nelloreImg from "@/assets/destinations/nellore.jpg";
import netarhatImg from "@/assets/destinations/netarhat.jpg";
import nubraImg from "@/assets/destinations/nubra.jpg";
import ootyImg from "@/assets/destinations/ooty.jpg";
import pahalgamImg from "@/assets/destinations/pahalgam.jpg";
import panajiImg from "@/assets/destinations/panaji.jpg";
import panchkulaImg from "@/assets/destinations/panchkula.jpg";
import pasighatImg from "@/assets/destinations/pasighat.jpg";
import patratuImg from "@/assets/destinations/patratu.jpg";
import pellingImg from "@/assets/destinations/pelling.jpg";
import pinjoreImg from "@/assets/destinations/pinjore.jpg";
import pondicherryImg from "@/assets/destinations/pondicherry.jpg";
import puneImg from "@/assets/destinations/pune.jpg";
import pushkarImg from "@/assets/destinations/pushkar.jpg";
import rajahmundryImg from "@/assets/destinations/rajahmundry.jpg";
import ramojiImg from "@/assets/destinations/ramoji.jpg";
import ranchiImg from "@/assets/destinations/ranchi.jpg";
import rishikeshImg from "@/assets/destinations/rishikesh.jpg";
import shillongImg from "@/assets/destinations/shillong.jpg";
import shimlaImg from "@/assets/destinations/shimla.jpg";
import somnathImg from "@/assets/destinations/somnath.jpg";
import sonamargImg from "@/assets/destinations/sonamarg.jpg";
import spitiImg from "@/assets/destinations/spiti.jpg";
import srinagarImg from "@/assets/destinations/srinagar.jpg";
import srisailamImg from "@/assets/destinations/srisailam.jpg";
import suratImg from "@/assets/destinations/surat.jpg";
import tadaImg from "@/assets/destinations/tada.jpg";
import tawangImg from "@/assets/destinations/tawang.jpg";
import tezuImg from "@/assets/destinations/tezu.jpg";
import tirupatiImg from "@/assets/destinations/tirupati.jpg";
import udaipurImg from "@/assets/destinations/udaipur.jpg";
import vadodaraImg from "@/assets/destinations/vadodara.jpg";
import varanasiImg from "@/assets/destinations/varanasi.jpg";
import vijayawadaImg from "@/assets/destinations/vijayawada.jpg";
import visakhapatnamImg from "@/assets/destinations/visakhapatnam.jpg";
import warangalImg from "@/assets/destinations/warangal.jpg";
import wayanadImg from "@/assets/destinations/wayanad.jpg";
import ziroImg from "@/assets/destinations/ziro.jpg";

const allDestinations = [
  { image: arakuImg, title: "Araku Valley", subtitle: "Coffee plantations & tribal culture", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Andhra Pradesh", link: "/stays" },
  { image: tirupatiImg, title: "Tirupati", subtitle: "Sacred temple town", rating: 4.7, priceRange: "Starting ₹900/night", state: "Andhra Pradesh", link: "/stays" },
  { image: visakhapatnamImg, title: "Visakhapatnam", subtitle: "City of Destiny", rating: 4.6, priceRange: "Starting ₹1,100/night", state: "Andhra Pradesh", link: "/stays" },
  { image: vijayawadaImg, title: "Vijayawada", subtitle: "Kanaka Durga on the Krishna", rating: 4.5, priceRange: "Starting ₹900/night", state: "Andhra Pradesh", link: "/stays" },
  { image: lambasingiImg, title: "Lambasingi", subtitle: "Kashmir of Andhra", rating: 4.5, priceRange: "Starting ₹1,100/night", state: "Andhra Pradesh", link: "/stays" },
  { image: kurnoolImg, title: "Kurnool", subtitle: "Gateway to Rayalaseema", rating: 4.3, priceRange: "Starting ₹800/night", state: "Andhra Pradesh", link: "/stays" },
  { image: gunturImg, title: "Guntur", subtitle: "Spice & chilli country", rating: 4.2, priceRange: "Starting ₹750/night", state: "Andhra Pradesh", link: "/stays" },
  { image: kadapaImg, title: "Kadapa", subtitle: "Historic Rayalaseema town", rating: 4.2, priceRange: "Starting ₹700/night", state: "Andhra Pradesh", link: "/stays" },
  { image: anantapurImg, title: "Anantapur", subtitle: "Lepakshi & silk country", rating: 4.3, priceRange: "Starting ₹750/night", state: "Andhra Pradesh", link: "/stays" },
  { image: bheemiliImg, title: "Bheemili", subtitle: "Quiet coastal beach town", rating: 4.4, priceRange: "Starting ₹950/night", state: "Andhra Pradesh", link: "/stays" },
  { image: tadaImg, title: "Tada", subtitle: "Trekking through Ubbalamadugu falls", rating: 4.5, priceRange: "Starting ₹800/night", state: "Andhra Pradesh", link: "/stays" },
  { image: tawangImg, title: "Tawang", subtitle: "Monastery in the clouds", rating: 4.8, priceRange: "Starting ₹1,500/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: ziroImg, title: "Ziro", subtitle: "Apatani valley & paddy fields", rating: 4.7, priceRange: "Starting ₹1,300/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: itanagarImg, title: "Itanagar", subtitle: "Capital amid green hills", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: naharlagunImg, title: "Naharlagun", subtitle: "Foothill town near Itanagar", rating: 4.2, priceRange: "Starting ₹900/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: pasighatImg, title: "Pasighat", subtitle: "Gateway to Arunachal", rating: 4.5, priceRange: "Starting ₹1,100/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: bomdilaImg, title: "Bomdila", subtitle: "Himalayan town & monastery", rating: 4.6, priceRange: "Starting ₹1,200/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: alongImg, title: "Along", subtitle: "Confluence of rivers & forest", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: tezuImg, title: "Tezu", subtitle: "Lohit valley & wildlife", rating: 4.3, priceRange: "Starting ₹950/night", state: "Arunachal Pradesh", link: "/stays" },
  { image: guwahatiImg, title: "Guwahati", subtitle: "Gateway to the Northeast", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Assam", link: "/stays" },
  { image: kazirangaImg, title: "Kaziranga National Park", subtitle: "One-horned rhino country", rating: 4.8, priceRange: "Starting ₹1,800/night", state: "Assam", link: "/stays" },
  { image: dibrugarhImg, title: "Dibrugarh", subtitle: "Tea capital on the Brahmaputra", rating: 4.4, priceRange: "Starting ₹1,100/night", state: "Assam", link: "/stays" },
  { image: jorhatImg, title: "Jorhat", subtitle: "Heart of Assam tea country", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Assam", link: "/stays" },
  { image: guwahatiImg, title: "Sivasagar", subtitle: "Ahom dynasty heritage", rating: 4.3, priceRange: "Starting ₹900/night", state: "Assam", link: "/stays" },
  { image: bodhgayaImg, title: "Bodh Gaya", subtitle: "Where Buddha attained enlightenment", rating: 4.8, priceRange: "Starting ₹900/night", state: "Bihar", link: "/stays" },
  { image: bodhgayaImg, title: "Patna", subtitle: "Ancient Pataliputra on the Ganga", rating: 4.2, priceRange: "Starting ₹800/night", state: "Bihar", link: "/stays" },
  { image: bodhgayaImg, title: "Rajgir", subtitle: "Buddhist & Jain pilgrimage hills", rating: 4.4, priceRange: "Starting ₹850/night", state: "Bihar", link: "/stays" },
  { image: bodhgayaImg, title: "Gaya", subtitle: "Sacred town on the Phalgu", rating: 4.3, priceRange: "Starting ₹750/night", state: "Bihar", link: "/stays" },
  { image: wayanadImg, title: "Jagdalpur", subtitle: "Tribal Bastar heartland", rating: 4.4, priceRange: "Starting ₹900/night", state: "Chhattisgarh", link: "/stays" },
  { image: hyderabadImg, title: "Raipur", subtitle: "Modern capital with ancient roots", rating: 4.2, priceRange: "Starting ₹800/night", state: "Chhattisgarh", link: "/stays" },
  { image: wayanadImg, title: "Bilaspur", subtitle: "Achanakmar tiger reserve gateway", rating: 4.2, priceRange: "Starting ₹800/night", state: "Chhattisgarh", link: "/stays" },
  { image: wayanadImg, title: "Chitrakote", subtitle: "Niagara of India waterfall", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "Chhattisgarh", link: "/stays" },
  { image: goaImg, title: "North Goa", subtitle: "Beaches & nightlife", rating: 4.8, priceRange: "Starting ₹1,500/night", state: "Goa", link: "/stays" },
  { image: goaImg, title: "South Goa", subtitle: "Serene beaches & heritage", rating: 4.7, priceRange: "Starting ₹1,800/night", state: "Goa", link: "/stays" },
  { image: panajiImg, title: "Panaji", subtitle: "Latin quarter of Fontainhas", rating: 4.6, priceRange: "Starting ₹1,400/night", state: "Goa", link: "/stays" },
  { image: goaImg, title: "Calangute", subtitle: "Queen of Goa beaches", rating: 4.4, priceRange: "Starting ₹1,300/night", state: "Goa", link: "/stays" },
  { image: goaImg, title: "Margao", subtitle: "Cultural capital of South Goa", rating: 4.3, priceRange: "Starting ₹1,200/night", state: "Goa", link: "/stays" },
  { image: goaImg, title: "Candolim", subtitle: "Quieter cousin of Calangute", rating: 4.4, priceRange: "Starting ₹1,400/night", state: "Goa", link: "/stays" },
  { image: goaImg, title: "Vagator", subtitle: "Cliff-top sunsets & Chapora fort", rating: 4.5, priceRange: "Starting ₹1,500/night", state: "Goa", link: "/stays" },
  { image: goaImg, title: "Vasco da Gama", subtitle: "Port town & gateway to Goa", rating: 4.2, priceRange: "Starting ₹1,100/night", state: "Goa", link: "/stays" },
  { image: wayanadImg, title: "Gir National Park", subtitle: "Home of the Asiatic lion", rating: 4.7, priceRange: "Starting ₹1,600/night", state: "Gujarat", link: "/stays" },
  { image: jaisalmerImg, title: "Bhuj", subtitle: "White Rann of Kutch", rating: 4.6, priceRange: "Starting ₹1,300/night", state: "Gujarat", link: "/stays" },
  { image: ahmedabadImg, title: "Ahmedabad", subtitle: "UNESCO heritage walled city", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Gujarat", link: "/stays" },
  { image: somnathImg, title: "Somnath", subtitle: "First Jyotirlinga on the Arabian sea", rating: 4.6, priceRange: "Starting ₹950/night", state: "Gujarat", link: "/stays" },
  { image: dwarkaImg, title: "Dwarka", subtitle: "Krishna's coastal kingdom", rating: 4.6, priceRange: "Starting ₹1,000/night", state: "Gujarat", link: "/stays" },
  { image: vadodaraImg, title: "Vadodara", subtitle: "City of Lakshmi Vilas palace", rating: 4.4, priceRange: "Starting ₹900/night", state: "Gujarat", link: "/stays" },
  { image: suratImg, title: "Surat", subtitle: "Diamond & textile capital", rating: 4.3, priceRange: "Starting ₹900/night", state: "Gujarat", link: "/stays" },
  { image: gurugramImg, title: "Gurugram", subtitle: "Millennium city skyline", rating: 4.2, priceRange: "Starting ₹1,200/night", state: "Haryana", link: "/stays" },
  { image: faridabadImg, title: "Faridabad", subtitle: "NCR business hub", rating: 4.1, priceRange: "Starting ₹1,000/night", state: "Haryana", link: "/stays" },
  { image: panchkulaImg, title: "Panchkula", subtitle: "Planned city near Shivalik foothills", rating: 4.3, priceRange: "Starting ₹1,000/night", state: "Haryana", link: "/stays" },
  { image: kurukshetraImg, title: "Kurukshetra", subtitle: "Land of the Mahabharata", rating: 4.5, priceRange: "Starting ₹850/night", state: "Haryana", link: "/stays" },
  { image: pinjoreImg, title: "Pinjore", subtitle: "Mughal-era Yadavindra gardens", rating: 4.4, priceRange: "Starting ₹800/night", state: "Haryana", link: "/stays" },
  { image: manaliImg, title: "Manali", subtitle: "Mountain paradise", rating: 4.7, priceRange: "Starting ₹1,200/night", state: "Himachal Pradesh", link: "/stays" },
  { image: shimlaImg, title: "Shimla", subtitle: "Queen of Hills", rating: 4.6, priceRange: "Starting ₹1,100/night", state: "Himachal Pradesh", link: "/stays" },
  { image: dharamshalaImg, title: "Dharamshala", subtitle: "Home of the Dalai Lama", rating: 4.7, priceRange: "Starting ₹900/night", state: "Himachal Pradesh", link: "/stays" },
  { image: dalhousieImg, title: "Dalhousie", subtitle: "Colonial hill retreat", rating: 4.6, priceRange: "Starting ₹1,000/night", state: "Himachal Pradesh", link: "/stays" },
  { image: kasolImg, title: "Kasol", subtitle: "Parvati valley vibes", rating: 4.5, priceRange: "Starting ₹800/night", state: "Himachal Pradesh", link: "/stays" },
  { image: kasauliImg, title: "Kasauli", subtitle: "Pine-scented quiet town", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Himachal Pradesh", link: "/stays" },
  { image: spitiImg, title: "Spiti Valley", subtitle: "Cold desert wonderland", rating: 4.9, priceRange: "Starting ₹1,500/night", state: "Himachal Pradesh", link: "/stays" },
  { image: srinagarImg, title: "Srinagar", subtitle: "Dal lake & shikaras", rating: 4.9, priceRange: "Starting ₹2,000/night", state: "Jammu & Kashmir", link: "/stays" },
  { image: gulmargImg, title: "Gulmarg", subtitle: "Meadow of flowers", rating: 4.8, priceRange: "Starting ₹2,500/night", state: "Jammu & Kashmir", link: "/stays" },
  { image: pahalgamImg, title: "Pahalgam", subtitle: "Valley of shepherds", rating: 4.7, priceRange: "Starting ₹1,800/night", state: "Jammu & Kashmir", link: "/stays" },
  { image: sonamargImg, title: "Sonamarg", subtitle: "Meadow of gold", rating: 4.7, priceRange: "Starting ₹1,900/night", state: "Jammu & Kashmir", link: "/stays" },
  { image: katraImg, title: "Katra", subtitle: "Base for Vaishno Devi yatra", rating: 4.6, priceRange: "Starting ₹1,200/night", state: "Jammu & Kashmir", link: "/stays" },
  { image: lehImg, title: "Leh", subtitle: "Land of high passes", rating: 4.9, priceRange: "Starting ₹2,000/night", state: "Ladakh", link: "/stays" },
  { image: netarhatImg, title: "Netarhat", subtitle: "Queen of Chotanagpur", rating: 4.5, priceRange: "Starting ₹900/night", state: "Jharkhand", link: "/stays" },
  { image: jamshedpurImg, title: "Jamshedpur", subtitle: "India's first planned steel city", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Jharkhand", link: "/stays" },
  { image: ranchiImg, title: "Ranchi", subtitle: "City of waterfalls", rating: 4.4, priceRange: "Starting ₹900/night", state: "Jharkhand", link: "/stays" },
  { image: deogharImg, title: "Deoghar", subtitle: "Sacred Jyotirlinga town", rating: 4.5, priceRange: "Starting ₹850/night", state: "Jharkhand", link: "/stays" },
  { image: patratuImg, title: "Patratu", subtitle: "Patratu valley & dam", rating: 4.5, priceRange: "Starting ₹900/night", state: "Jharkhand", link: "/stays" },
  { image: chaibasaImg, title: "Chaibasa", subtitle: "Ho tribal heartland", rating: 4.2, priceRange: "Starting ₹750/night", state: "Jharkhand", link: "/stays" },
  { image: jamshedpurImg, title: "Tatanagar", subtitle: "Steel city junction", rating: 4.2, priceRange: "Starting ₹900/night", state: "Jharkhand", link: "/stays" },
  { image: wayanadImg, title: "Latehar", subtitle: "Betla forest gateway", rating: 4.3, priceRange: "Starting ₹850/night", state: "Jharkhand", link: "/stays" },
  { image: coorgImg, title: "Coorg", subtitle: "Scotland of India", rating: 4.7, priceRange: "Starting ₹1,300/night", state: "Karnataka", link: "/stays" },
  { image: bengaluruImg, title: "Bengaluru", subtitle: "Garden city tech capital", rating: 4.5, priceRange: "Starting ₹1,500/night", state: "Karnataka", link: "/stays" },
  { image: mysoreImg, title: "Mysore", subtitle: "Palace city of royals", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "Karnataka", link: "/stays" },
  { image: hampiImg, title: "Hampi", subtitle: "Ancient ruins & boulders", rating: 4.6, priceRange: "Starting ₹600/night", state: "Karnataka", link: "/stays" },
  { image: wayanadImg, title: "Kabini", subtitle: "Riverside wildlife getaway", rating: 4.7, priceRange: "Starting ₹2,000/night", state: "Karnataka", link: "/stays" },
  { image: gokarnaImg, title: "Gokarna", subtitle: "Pristine beaches & temples", rating: 4.5, priceRange: "Starting ₹800/night", state: "Karnataka", link: "/stays" },
  { image: coorgImg, title: "Chikmagalur", subtitle: "Birthplace of Indian coffee", rating: 4.6, priceRange: "Starting ₹1,200/night", state: "Karnataka", link: "/stays" },
  { image: goaImg, title: "Mangalore", subtitle: "Coastal Konkan town", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Karnataka", link: "/stays" },
  { image: munnarImg, title: "Munnar", subtitle: "Tea gardens & mist", rating: 4.6, priceRange: "Starting ₹900/night", state: "Kerala", link: "/stays" },
  { image: wayanadImg, title: "Wayanad", subtitle: "Lush green wilderness", rating: 4.5, priceRange: "Starting ₹1,200/night", state: "Kerala", link: "/stays" },
  { image: alleppeyImg, title: "Alleppey", subtitle: "Backwater houseboat capital", rating: 4.8, priceRange: "Starting ₹2,000/night", state: "Kerala", link: "/stays" },
  { image: kochiImg, title: "Kochi", subtitle: "Historic port city", rating: 4.4, priceRange: "Starting ₹800/night", state: "Kerala", link: "/stays" },
  { image: wayanadImg, title: "Thekkady", subtitle: "Periyar wildlife & spice country", rating: 4.6, priceRange: "Starting ₹1,300/night", state: "Kerala", link: "/stays" },
  { image: gokarnaImg, title: "Varkala", subtitle: "Red cliff beach town", rating: 4.6, priceRange: "Starting ₹1,200/night", state: "Kerala", link: "/stays" },
  { image: goaImg, title: "Kovalam", subtitle: "Crescent beach lighthouse", rating: 4.5, priceRange: "Starting ₹1,400/night", state: "Kerala", link: "/stays" },
  { image: coorgImg, title: "Pachmarhi", subtitle: "Satpura queen of hills", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Madhya Pradesh", link: "/stays" },
  { image: wayanadImg, title: "Pipariya", subtitle: "Gateway to Pachmarhi", rating: 4.1, priceRange: "Starting ₹700/night", state: "Madhya Pradesh", link: "/stays" },
  { image: hyderabadImg, title: "Bhopal", subtitle: "City of lakes & mosques", rating: 4.4, priceRange: "Starting ₹900/night", state: "Madhya Pradesh", link: "/stays" },
  { image: hyderabadImg, title: "Indore", subtitle: "Foodie capital of India", rating: 4.5, priceRange: "Starting ₹950/night", state: "Madhya Pradesh", link: "/stays" },
  { image: hampiImg, title: "Jabalpur", subtitle: "Marble rocks of Bhedaghat", rating: 4.4, priceRange: "Starting ₹900/night", state: "Madhya Pradesh", link: "/stays" },
  { image: tirupatiImg, title: "Ujjain", subtitle: "Mahakal Jyotirlinga on the Shipra", rating: 4.6, priceRange: "Starting ₹850/night", state: "Madhya Pradesh", link: "/stays" },
  { image: jaipurImg, title: "Gwalior", subtitle: "Hill-top fort city", rating: 4.5, priceRange: "Starting ₹950/night", state: "Madhya Pradesh", link: "/stays" },
  { image: hampiImg, title: "Khajuraho", subtitle: "UNESCO sculpted temples", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "Madhya Pradesh", link: "/stays" },
  { image: lonavalaImg, title: "Lonavala", subtitle: "Misty hills & chikkis", rating: 4.3, priceRange: "Starting ₹1,200/night", state: "Maharashtra", link: "/stays" },
  { image: mahabaleshwarImg, title: "Mahabaleshwar", subtitle: "Strawberry country", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Maharashtra", link: "/stays" },
  { image: puneImg, title: "Pune", subtitle: "Cultural capital of Maharashtra", rating: 4.5, priceRange: "Starting ₹1,300/night", state: "Maharashtra", link: "/stays" },
  { image: hyderabadImg, title: "Nagpur", subtitle: "Orange city & tiger gateway", rating: 4.3, priceRange: "Starting ₹900/night", state: "Maharashtra", link: "/stays" },
  { image: mumbaiImg, title: "Mumbai", subtitle: "City of dreams", rating: 4.7, priceRange: "Starting ₹1,800/night", state: "Maharashtra", link: "/stays" },
  { image: goaImg, title: "Alibaug", subtitle: "Weekend coastal escape", rating: 4.5, priceRange: "Starting ₹1,400/night", state: "Maharashtra", link: "/stays" },
  { image: mahabaleshwarImg, title: "Panchgani", subtitle: "Strawberry plateau views", rating: 4.4, priceRange: "Starting ₹1,100/night", state: "Maharashtra", link: "/stays" },
  { image: tirupatiImg, title: "Nashik", subtitle: "Wine capital & Kumbh city", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Maharashtra", link: "/stays" },
  { image: ziroImg, title: "Imphal", subtitle: "Kangla fort & polo ground", rating: 4.4, priceRange: "Starting ₹950/night", state: "Manipur", link: "/stays" },
  { image: ziroImg, title: "Moirang", subtitle: "INA memorial & Loktak gateway", rating: 4.3, priceRange: "Starting ₹850/night", state: "Manipur", link: "/stays" },
  { image: ziroImg, title: "Loktak Lake", subtitle: "Floating phumdi islands", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "Manipur", link: "/stays" },
  { image: ziroImg, title: "Saiton", subtitle: "Hillside village of Manipur", rating: 4.2, priceRange: "Starting ₹750/night", state: "Manipur", link: "/stays" },
  { image: ziroImg, title: "Thanga", subtitle: "Loktak fishing village", rating: 4.3, priceRange: "Starting ₹800/night", state: "Manipur", link: "/stays" },
  { image: ziroImg, title: "Karang", subtitle: "Loktak island village", rating: 4.3, priceRange: "Starting ₹800/night", state: "Manipur", link: "/stays" },
  { image: shillongImg, title: "Shillong", subtitle: "Scotland of the East", rating: 4.6, priceRange: "Starting ₹1,000/night", state: "Meghalaya", link: "/stays" },
  { image: cherrapunjiImg, title: "Cherrapunji", subtitle: "Wettest place on Earth", rating: 4.7, priceRange: "Starting ₹1,200/night", state: "Meghalaya", link: "/stays" },
  { image: cherrapunjiImg, title: "Dawki", subtitle: "Crystal Umngot river", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "Meghalaya", link: "/stays" },
  { image: cherrapunjiImg, title: "Shnongpdeng", subtitle: "Turquoise river camping", rating: 4.6, priceRange: "Starting ₹1,200/night", state: "Meghalaya", link: "/stays" },
  { image: cherrapunjiImg, title: "Jowai", subtitle: "Jaintia hills & waterfalls", rating: 4.5, priceRange: "Starting ₹950/night", state: "Meghalaya", link: "/stays" },
  { image: cherrapunjiImg, title: "Mawlynnong", subtitle: "Asia's cleanest village", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "Meghalaya", link: "/stays" },
  { image: cherrapunjiImg, title: "Aizawl", subtitle: "Ridge-line capital", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Mizoram", link: "/stays" },
  { image: cherrapunjiImg, title: "Thenzawl", subtitle: "Vantawng falls town", rating: 4.4, priceRange: "Starting ₹950/night", state: "Mizoram", link: "/stays" },
  { image: cherrapunjiImg, title: "Reiek", subtitle: "Reiek peak & valley views", rating: 4.5, priceRange: "Starting ₹900/night", state: "Mizoram", link: "/stays" },
  { image: cherrapunjiImg, title: "Hmuifang", subtitle: "Forested Mizo highland", rating: 4.4, priceRange: "Starting ₹900/night", state: "Mizoram", link: "/stays" },
  { image: cherrapunjiImg, title: "Lunglei", subtitle: "Town of bridges", rating: 4.3, priceRange: "Starting ₹850/night", state: "Mizoram", link: "/stays" },
  { image: cherrapunjiImg, title: "Champhai", subtitle: "Rice bowl & Rih Dil lake", rating: 4.5, priceRange: "Starting ₹950/night", state: "Mizoram", link: "/stays" },
  { image: cherrapunjiImg, title: "Mamit", subtitle: "Bamboo forests of west Mizoram", rating: 4.2, priceRange: "Starting ₹800/night", state: "Mizoram", link: "/stays" },
  { image: ziroImg, title: "Kohima", subtitle: "Capital of the Hornbill festival", rating: 4.6, priceRange: "Starting ₹1,100/night", state: "Nagaland", link: "/stays" },
  { image: ziroImg, title: "Dimapur", subtitle: "Commercial gateway to Nagaland", rating: 4.2, priceRange: "Starting ₹900/night", state: "Nagaland", link: "/stays" },
  { image: ziroImg, title: "Mon", subtitle: "Konyak tribal heartland", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Nagaland", link: "/stays" },
  { image: ziroImg, title: "Mokokchung", subtitle: "Ao Naga cultural capital", rating: 4.4, priceRange: "Starting ₹950/night", state: "Nagaland", link: "/stays" },
  { image: ziroImg, title: "Pfutsero", subtitle: "Highest town of Nagaland", rating: 4.5, priceRange: "Starting ₹950/night", state: "Nagaland", link: "/stays" },
  { image: goaImg, title: "Puri", subtitle: "Jagannath temple & beach", rating: 4.6, priceRange: "Starting ₹900/night", state: "Odisha", link: "/stays" },
  { image: tirupatiImg, title: "Bhubaneswar", subtitle: "Temple city of India", rating: 4.4, priceRange: "Starting ₹850/night", state: "Odisha", link: "/stays" },
  { image: tirupatiImg, title: "Konark", subtitle: "Sun temple chariot wheels", rating: 4.7, priceRange: "Starting ₹1,000/night", state: "Odisha", link: "/stays" },
  { image: alleppeyImg, title: "Chilika Lake", subtitle: "Asia's largest brackish lagoon", rating: 4.5, priceRange: "Starting ₹1,100/night", state: "Odisha", link: "/stays" },
  { image: hyderabadImg, title: "Cuttack", subtitle: "Silver filigree city", rating: 4.2, priceRange: "Starting ₹750/night", state: "Odisha", link: "/stays" },
  { image: amritsarImg, title: "Amritsar", subtitle: "Golden temple & langar", rating: 4.9, priceRange: "Starting ₹1,100/night", state: "Punjab", link: "/stays" },
  { image: hyderabadImg, title: "Ludhiana", subtitle: "Manchester of India", rating: 4.2, priceRange: "Starting ₹900/night", state: "Punjab", link: "/stays" },
  { image: hyderabadImg, title: "Jalandhar", subtitle: "Doaba sports & sweets city", rating: 4.2, priceRange: "Starting ₹850/night", state: "Punjab", link: "/stays" },
  { image: jaipurImg, title: "Patiala", subtitle: "Royal Phulkian capital", rating: 4.4, priceRange: "Starting ₹900/night", state: "Punjab", link: "/stays" },
  { image: dharamshalaImg, title: "Pathankot", subtitle: "Gateway to Kangra & Kashmir", rating: 4.3, priceRange: "Starting ₹850/night", state: "Punjab", link: "/stays" },
  { image: jaipurImg, title: "Jaipur", subtitle: "The Pink City", rating: 4.9, priceRange: "Starting ₹1,000/night", state: "Rajasthan", link: "/stays" },
  { image: udaipurImg, title: "Udaipur", subtitle: "City of Lakes", rating: 4.8, priceRange: "Starting ₹1,800/night", state: "Rajasthan", link: "/stays" },
  { image: jaisalmerImg, title: "Jaisalmer", subtitle: "The Golden City", rating: 4.7, priceRange: "Starting ₹1,200/night", state: "Rajasthan", link: "/stays" },
  { image: jodhpurImg, title: "Jodhpur", subtitle: "The Blue City", rating: 4.7, priceRange: "Starting ₹900/night", state: "Rajasthan", link: "/stays" },
  { image: coorgImg, title: "Mount Abu", subtitle: "Aravalli's only hill station", rating: 4.5, priceRange: "Starting ₹1,100/night", state: "Rajasthan", link: "/stays" },
  { image: pushkarImg, title: "Pushkar", subtitle: "Sacred lake town", rating: 4.5, priceRange: "Starting ₹800/night", state: "Rajasthan", link: "/stays" },
  { image: wayanadImg, title: "Ranthambore", subtitle: "Tiger reserve & fort", rating: 4.7, priceRange: "Starting ₹1,700/night", state: "Rajasthan", link: "/stays" },
  { image: gangtokImg, title: "Gangtok", subtitle: "Gateway to the Himalayas", rating: 4.7, priceRange: "Starting ₹1,300/night", state: "Sikkim", link: "/stays" },
  { image: pellingImg, title: "Pelling", subtitle: "Kanchenjunga views", rating: 4.6, priceRange: "Starting ₹1,100/night", state: "Sikkim", link: "/stays" },
  { image: pellingImg, title: "Lachung", subtitle: "Yumthang valley of flowers", rating: 4.7, priceRange: "Starting ₹1,500/night", state: "Sikkim", link: "/stays" },
  { image: pellingImg, title: "Lachen", subtitle: "Gurudongmar lake base", rating: 4.7, priceRange: "Starting ₹1,600/night", state: "Sikkim", link: "/stays" },
  { image: pellingImg, title: "Yuksom", subtitle: "First capital of Sikkim", rating: 4.6, priceRange: "Starting ₹1,100/night", state: "Sikkim", link: "/stays" },
  { image: gangtokImg, title: "Ravangla", subtitle: "Buddha park & ridge views", rating: 4.6, priceRange: "Starting ₹1,200/night", state: "Sikkim", link: "/stays" },
  { image: pellingImg, title: "Lingtam", subtitle: "Quiet east Sikkim village", rating: 4.3, priceRange: "Starting ₹950/night", state: "Sikkim", link: "/stays" },
  { image: ootyImg, title: "Ooty", subtitle: "Queen of Nilgiris", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Tamil Nadu", link: "/stays" },
  { image: kodaikanalImg, title: "Kodaikanal", subtitle: "Princess of hill stations", rating: 4.6, priceRange: "Starting ₹1,100/night", state: "Tamil Nadu", link: "/stays" },
  { image: chennaiImg, title: "Chennai", subtitle: "Marina city of temples", rating: 4.4, priceRange: "Starting ₹1,300/night", state: "Tamil Nadu", link: "/stays" },
  { image: tirupatiImg, title: "Mahabalipuram", subtitle: "UNESCO shore temple", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "Tamil Nadu", link: "/stays" },
  { image: tirupatiImg, title: "Madurai", subtitle: "Meenakshi temple city", rating: 4.6, priceRange: "Starting ₹950/night", state: "Tamil Nadu", link: "/stays" },
  { image: coorgImg, title: "Yercaud", subtitle: "Coffee hills of Shevaroys", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Tamil Nadu", link: "/stays" },
  { image: pondicherryImg, title: "Pondicherry", subtitle: "French colonial charm", rating: 4.7, priceRange: "Starting ₹1,200/night", state: "Tamil Nadu", link: "/stays" },
  { image: hyderabadImg, title: "Hyderabad", subtitle: "City of Pearls & Biryani", rating: 4.8, priceRange: "Starting ₹1,200/night", state: "Telangana", link: "/stays" },
  { image: warangalImg, title: "Warangal", subtitle: "Kakatiya heritage city", rating: 4.4, priceRange: "Starting ₹800/night", state: "Telangana", link: "/stays" },
  { image: ramojiImg, title: "Ramoji Film City", subtitle: "World's largest film studio", rating: 4.7, priceRange: "Starting ₹1,500/night", state: "Telangana", link: "/stays" },
  { image: bhadrachalamImg, title: "Bhadrachalam", subtitle: "Sacred Rama temple on Godavari", rating: 4.6, priceRange: "Starting ₹700/night", state: "Telangana", link: "/stays" },
  { image: medakImg, title: "Medak", subtitle: "Gothic cathedral & fort", rating: 4.5, priceRange: "Starting ₹600/night", state: "Telangana", link: "/stays" },
  { image: warangalImg, title: "Khammam", subtitle: "Khammam fort town", rating: 4.2, priceRange: "Starting ₹700/night", state: "Telangana", link: "/stays" },
  { image: warangalImg, title: "Nizamabad", subtitle: "Land of nizams & turmeric", rating: 4.2, priceRange: "Starting ₹700/night", state: "Telangana", link: "/stays" },
  { image: warangalImg, title: "Karimnagar", subtitle: "Elgandal fort & Manair dam", rating: 4.2, priceRange: "Starting ₹700/night", state: "Telangana", link: "/stays" },
  { image: ziroImg, title: "Agartala", subtitle: "Ujjayanta palace capital", rating: 4.4, priceRange: "Starting ₹900/night", state: "Tripura", link: "/stays" },
  { image: ziroImg, title: "Jampui Hills", subtitle: "Orange orchards & misty ridges", rating: 4.6, priceRange: "Starting ₹1,000/night", state: "Tripura", link: "/stays" },
  { image: ziroImg, title: "Dharmanagar", subtitle: "Quiet North Tripura town", rating: 4.2, priceRange: "Starting ₹750/night", state: "Tripura", link: "/stays" },
  { image: ziroImg, title: "Kumarghat", subtitle: "Tea gardens & rolling hills", rating: 4.3, priceRange: "Starting ₹800/night", state: "Tripura", link: "/stays" },
  { image: ziroImg, title: "Vanghmun", subtitle: "Jampui hill village", rating: 4.3, priceRange: "Starting ₹800/night", state: "Tripura", link: "/stays" },
  { image: ziroImg, title: "Phuldungsei", subtitle: "Bamboo forest hamlet", rating: 4.2, priceRange: "Starting ₹750/night", state: "Tripura", link: "/stays" },
  { image: ziroImg, title: "Damcherra", subtitle: "Tribal forest reserve", rating: 4.2, priceRange: "Starting ₹750/night", state: "Tripura", link: "/stays" },
  { image: varanasiImg, title: "Varanasi", subtitle: "Spiritual capital on the Ganga", rating: 4.9, priceRange: "Starting ₹900/night", state: "Uttar Pradesh", link: "/stays" },
  { image: agraImg, title: "Agra", subtitle: "Home of the Taj Mahal", rating: 4.9, priceRange: "Starting ₹1,100/night", state: "Uttar Pradesh", link: "/stays" },
  { image: varanasiImg, title: "Mathura", subtitle: "Birthplace of Krishna", rating: 4.6, priceRange: "Starting ₹800/night", state: "Uttar Pradesh", link: "/stays" },
  { image: varanasiImg, title: "Vrindavan", subtitle: "Land of Radha-Krishna leelas", rating: 4.7, priceRange: "Starting ₹850/night", state: "Uttar Pradesh", link: "/stays" },
  { image: jaipurImg, title: "Lucknow", subtitle: "City of nawabs & kebabs", rating: 4.6, priceRange: "Starting ₹1,000/night", state: "Uttar Pradesh", link: "/stays" },
  { image: hyderabadImg, title: "Noida", subtitle: "NCR satellite city", rating: 4.2, priceRange: "Starting ₹1,100/night", state: "Uttar Pradesh", link: "/stays" },
  { image: hyderabadImg, title: "Mau", subtitle: "Weavers of Banarasi sarees", rating: 4.1, priceRange: "Starting ₹650/night", state: "Uttar Pradesh", link: "/stays" },
  { image: rishikeshImg, title: "Rishikesh", subtitle: "Yoga capital of the world", rating: 4.7, priceRange: "Starting ₹800/night", state: "Uttarakhand", link: "/stays" },
  { image: mussoorieImg, title: "Mussoorie", subtitle: "Queen of the Hills", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "Uttarakhand", link: "/stays" },
  { image: nainitalImg, title: "Nainital", subtitle: "Lake district of India", rating: 4.6, priceRange: "Starting ₹900/night", state: "Uttarakhand", link: "/stays" },
  { image: mussoorieImg, title: "Dehradun", subtitle: "Doon valley capital", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "Uttarakhand", link: "/stays" },
  { image: rishikeshImg, title: "Haridwar", subtitle: "Gateway to the gods", rating: 4.7, priceRange: "Starting ₹800/night", state: "Uttarakhand", link: "/stays" },
  { image: auliImg, title: "Auli", subtitle: "Skiing paradise", rating: 4.7, priceRange: "Starting ₹1,500/night", state: "Uttarakhand", link: "/stays" },
  { image: wayanadImg, title: "Jim Corbett National Park", subtitle: "India's oldest tiger reserve", rating: 4.7, priceRange: "Starting ₹1,800/night", state: "Uttarakhand", link: "/stays" },
  { image: darjeelingImg, title: "Darjeeling", subtitle: "Toy train & Kanchenjunga", rating: 4.8, priceRange: "Starting ₹1,300/night", state: "West Bengal", link: "/stays" },
  { image: darjeelingImg, title: "Siliguri", subtitle: "Gateway to the Northeast", rating: 4.3, priceRange: "Starting ₹950/night", state: "West Bengal", link: "/stays" },
  { image: kolkataImg, title: "Kolkata", subtitle: "City of joy", rating: 4.7, priceRange: "Starting ₹1,100/night", state: "West Bengal", link: "/stays" },
  { image: goaImg, title: "Digha", subtitle: "Bengal's favourite beach", rating: 4.3, priceRange: "Starting ₹800/night", state: "West Bengal", link: "/stays" },
  { image: darjeelingImg, title: "Kalimpong", subtitle: "Quiet hill town near Teesta", rating: 4.5, priceRange: "Starting ₹1,000/night", state: "West Bengal", link: "/stays" },
  { image: goaImg, title: "Mandarmani", subtitle: "Drive-on-beach getaway", rating: 4.4, priceRange: "Starting ₹1,000/night", state: "West Bengal", link: "/stays" },
  { image: wayanadImg, title: "Sundarbans", subtitle: "Mangrove tiger delta", rating: 4.7, priceRange: "Starting ₹1,600/night", state: "West Bengal", link: "/stays" },
  { image: nubraImg, title: "Nubra Valley", subtitle: "Desert in the mountains", rating: 4.8, priceRange: "Starting ₹2,500/night", state: "Ladakh", link: "/stays" },
  { image: nagarjunasagarImg, title: "Nagarjuna Sagar", subtitle: "Massive dam & Buddhist ruins", rating: 4.3, priceRange: "Starting ₹700/night", state: "Andhra Pradesh", link: "/stays" },
  { image: gandikotaImg, title: "Gandikota", subtitle: "Grand Canyon of India", rating: 4.6, priceRange: "Starting ₹800/night", state: "Andhra Pradesh", link: "/stays" },
  { image: srisailamImg, title: "Srisailam", subtitle: "Jyotirlinga temple & forests", rating: 4.7, priceRange: "Starting ₹850/night", state: "Andhra Pradesh", link: "/stays" },
  { image: lepakshiImg, title: "Lepakshi", subtitle: "Giant Nandi & hanging pillar", rating: 4.5, priceRange: "Starting ₹650/night", state: "Andhra Pradesh", link: "/stays" },
  { image: horsleyhillsImg, title: "Horsley Hills", subtitle: "Serene Andhra hill station", rating: 4.4, priceRange: "Starting ₹950/night", state: "Andhra Pradesh", link: "/stays" },
  { image: warangalImg, title: "Mahabubnagar", subtitle: "Pillalamarri banyan town", rating: 4.1, priceRange: "Starting ₹650/night", state: "Telangana", link: "/stays" },
  { image: warangalImg, title: "Siddipet", subtitle: "Lakes & growing satellite town", rating: 4.0, priceRange: "Starting ₹600/night", state: "Telangana", link: "/stays" },
  { image: warangalImg, title: "Nalgonda", subtitle: "Bhongir fort gateway", rating: 4.1, priceRange: "Starting ₹650/night", state: "Telangana", link: "/stays" },
  { image: warangalImg, title: "Adilabad", subtitle: "Kuntala falls forest district", rating: 4.3, priceRange: "Starting ₹750/night", state: "Telangana", link: "/stays" },
  { image: hyderabadImg, title: "Hubli", subtitle: "Twin city commercial hub", rating: 4.2, priceRange: "Starting ₹800/night", state: "Karnataka", link: "/stays" },
  { image: hampiImg, title: "Gulbarga", subtitle: "Bahmani fort & dargah", rating: 4.3, priceRange: "Starting ₹800/night", state: "Karnataka", link: "/stays" },
  { image: hampiImg, title: "Davanagere", subtitle: "Manchester of Karnataka", rating: 4.1, priceRange: "Starting ₹750/night", state: "Karnataka", link: "/stays" },
  { image: hampiImg, title: "Bidar", subtitle: "Bahmani heritage city", rating: 4.4, priceRange: "Starting ₹800/night", state: "Karnataka", link: "/stays" },
  { image: rajahmundryImg, title: "Rajahmundry", subtitle: "Cultural capital on the Godavari", rating: 4.4, priceRange: "Starting ₹900/night", state: "Andhra Pradesh", link: "/stays" },
  { image: nelloreImg, title: "Nellore", subtitle: "Aquaculture & temple town", rating: 4.2, priceRange: "Starting ₹800/night", state: "Andhra Pradesh", link: "/stays" },
];

const states = [...new Set(allDestinations.map((d) => d.state))].sort();

const Destinations = () => {
  const [selectedState, setSelectedState] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = allDestinations.filter((d) => {
    const matchesState = selectedState === "All" || d.state === selectedState;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      d.title.toLowerCase().includes(q) ||
      d.state.toLowerCase().includes(q) ||
      d.subtitle.toLowerCase().includes(q);
    return matchesState && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <Marquee />
      <Header />

      <section className="container mx-auto px-4 pt-10 pb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Explore Destinations
          </h1>
          <p className="text-muted-foreground text-lg mb-8">
            Discover stunning tourist places across India
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col gap-4 mb-8"
        >
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search destinations, states or vibes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedState("All")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
                selectedState === "All"
                  ? "bg-gradient-to-r from-primary/80 to-primary/60 text-white border-primary/30 shadow-lg shadow-primary/20"
                  : "bg-muted/80 text-foreground border-border hover:bg-muted"
              }`}
            >
              All States
            </button>
            {states.map((state) => (
              <button
                key={state}
                onClick={() => setSelectedState(state)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 backdrop-blur-md border ${
                  selectedState === state
                    ? "bg-gradient-to-r from-primary/80 to-primary/60 text-white border-primary/30 shadow-lg shadow-primary/20"
                    : "bg-muted/80 text-foreground border-border hover:bg-muted"
                }`}
              >
                {state}
              </button>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 pb-16">
        <p className="text-sm text-muted-foreground mb-6">
          Showing {filtered.length} destination{filtered.length !== 1 ? "s" : ""}
          {selectedState !== "All" ? ` in ${selectedState}` : ""}
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filtered.map((dest, index) => (
            <DestinationCard
              key={`${dest.title}-${dest.state}`}
              image={dest.image}
              title={dest.title}
              subtitle={dest.subtitle}
              rating={dest.rating}
              priceRange={dest.priceRange}
              link={dest.link}
              delay={Math.min(index, 30) * 0.02}
            />
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No destinations found. Try a different filter.</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Destinations;
